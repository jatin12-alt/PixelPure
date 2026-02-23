import { Webhook } from 'svix'
import { headers } from 'next/headers'
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

  let evt: any; 
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    return new Response('Error', { status: 400 });
  }

  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    // NUCLEAR FIX: No destructuring on line 118
    const d = evt.data; 
    const email = d.email_addresses?.[0]?.email_address || "";

    await prisma.user.upsert({
      where: { clerkId: d.id },
      update: { email, name: `${d.first_name || ''} ${d.last_name || ''}`, imageUrl: d.image_url },
      create: {
        clerkId: d.id,
        email,
        name: `${d.first_name || ''} ${d.last_name || ''}`,
        imageUrl: d.image_url,
        plan: 'FREE',
        credits: 3,
        referralCode: `REF-${d.id.slice(-5)}`,
      }
    });
  }

  return NextResponse.json({ success: true });
}