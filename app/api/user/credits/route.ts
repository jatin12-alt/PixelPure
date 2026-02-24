import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            select: { credits: true },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        return NextResponse.json({ credits: user.credits });
    } catch (error) {
        console.error("[CREDITS_GET_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            select: { id: true, credits: true },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        if (user.credits <= 0) {
            return new NextResponse("Insufficient credits", { status: 403 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { credits: { decrement: 1 } },
        });

        return NextResponse.json({ credits: updatedUser.credits });
    } catch (error) {
        console.error("[CREDITS_DEDUCT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
