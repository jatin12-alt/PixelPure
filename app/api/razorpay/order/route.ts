import { auth, currentUser } from "@clerk/nextjs/server";
import { razorpay } from "@/lib/razorpay";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { planId, isYearly } = body;

        if (!planId) {
            return new NextResponse("Plan ID is required", { status: 400 });
        }

        // Define plan prices in INR (paise)
        const planPrices: Record<string, { monthly: number; yearly: number }> = {
            pro: { monthly: 1599, yearly: 1199 },
            business: { monthly: 6599, yearly: 4999 },
        };

        const plan = planPrices[planId.toLowerCase()];
        if (!plan) {
            return new NextResponse("Invalid plan ID", { status: 400 });
        }

        const amount = isYearly ? plan.yearly * 12 : plan.monthly;

        // Razorpay expects amount in paise (multiply by 100)
        const orderOptions = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}_${userId.substring(0, 10)}`,
            notes: {
                userId,
                planId,
                isYearly: isYearly ? "true" : "false",
                email: user.emailAddresses[0].emailAddress,
            },
        };

        const order = await razorpay.orders.create(orderOptions);

        return NextResponse.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error: any) {
        console.error("[RAZORPAY_ORDER_ERROR]", error);
        return new NextResponse(error.message || "Internal Error", { status: 500 });
    }
}
