import { headers } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("x-razorpay-signature") as string;
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error("RAZORPAY_WEBHOOK_SECRET is not defined");
        return new NextResponse("Webhook Secret not configured", { status: 500 });
    }

    if (!signature) {
        return new NextResponse("No signature provided", { status: 400 });
    }

    // Verify signature
    const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(body)
        .digest("hex");

    if (expectedSignature !== signature) {
        console.error("Invalid Razorpay signature");
        return new NextResponse("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    // Handle payment.captured event
    if (event.event === "payment.captured") {
        const payment = event.payload.payment.entity;
        const orderId = payment.order_id;

        // Notes are usually in the order or payment
        const notes = payment.notes;
        const userId = notes.userId;
        const planId = notes.planId;
        const isYearly = notes.isYearly === "true";

        if (!userId || !planId) {
            console.error("Missing userId or planId in payment notes", notes);
            return new NextResponse("Missing metadata", { status: 400 });
        }

        try {
            // Calculate credits based on plan
            let creditsToAdd = 0;
            let planType = "FREE";

            if (planId.toLowerCase() === "pro") {
                creditsToAdd = 150;
                planType = "PRO";
            } else if (planId.toLowerCase() === "business") {
                creditsToAdd = 999999; // Unlimited
                planType = "BUSINESS";
            }

            // Update user and subscription
            await prisma.$transaction([
                prisma.user.update({
                    where: { id: userId },
                    data: {
                        plan: planType as any,
                        credits: { increment: creditsToAdd },
                        razorpayOrderId: orderId,
                        razorpayPaymentId: payment.id,
                    },
                }),
                prisma.subscription.upsert({
                    where: { razorpayOrderId: orderId },
                    create: {
                        userId,
                        razorpayOrderId: orderId,
                        razorpayPaymentId: payment.id,
                        plan: planType as any,
                        status: "active",
                    },
                    update: {
                        razorpayPaymentId: payment.id,
                        status: "active",
                    },
                }),
            ]);

            console.log(`Successfully processed payment for user ${userId}, plan ${planId}`);
        } catch (error) {
            console.error("Error updating database after payment:", error);
            return new NextResponse("Database update failed", { status: 500 });
        }
    }

    return new NextResponse(null, { status: 200 });
}
