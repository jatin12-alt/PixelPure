import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) return new Response('Error', { status: 400 });

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let evt: any; // EKDUM ANY - NO TYPES
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response('Error', { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    // AB TYPESCRIPT KUCH NAHI BOL PAYEGA
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    let email = email_addresses?.[0]?.email_address || "";

    await prisma.user.upsert({
      where: { clerkId: id },
      update: { email, name: `${first_name} ${last_name}`, imageUrl: image_url },
      create: {
        clerkId: id,
        email,
        name: `${first_name} ${last_name}`,
        imageUrl: image_url,
        plan: 'FREE',
        credits: 3,
        referralCode: `REF-${id.slice(-5)}`,
      }
    });
  }

  return NextResponse.json({ success: true });
}