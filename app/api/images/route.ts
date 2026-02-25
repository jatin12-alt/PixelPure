import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId: clerkId } = await auth();

        if (!clerkId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { originalUrl, enhancedUrl, enhancementType } = await req.json();

        if (!originalUrl || !enhancedUrl) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { clerkId },
            select: { id: true },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const image = await prisma.image.create({
            data: {
                userId: user.id,
                originalUrl,
                enhancedUrl,
                status: "COMPLETED",
                enhancementType: enhancementType || "pro-photography",
                creditsUsed: 1,
            },
        });

        return NextResponse.json(image);
    } catch (error) {
        console.error("[IMAGES_POST_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const { userId: clerkId } = await auth();

        if (!clerkId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { clerkId },
            select: { id: true },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const images = await prisma.image.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(images);
    } catch (error) {
        console.error("[IMAGES_GET_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
