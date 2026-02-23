import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, UserJSON } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function generateUniqueReferralCode(): Promise<string> {
  let code: string = "";
  let exists = true;
  let attempts = 0;
  const maxAttempts = 10;

  while (exists && attempts < maxAttempts) {
    code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const existing = await prisma.user.findUnique({
      where: { referralCode: code },
    });
    exists = !!existing;
    attempts++;
  }

  if (exists) {
    code = `REF${Date.now().toString(36).toUpperCase().slice(-5)}`;
  }

  return code;
}

export async function POST(req: Request) {
  const startTime = Date.now();
  let eventType: string | null = null;

  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Webhook secret missing' }, { status: 500 });
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('[WEBHOOK ERROR] Verification failed');
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
    }

    eventType = evt.type;

    if (eventType === 'user.created' || eventType === 'user.updated') {
      // FIX: Cast to UserJSON to prevent TypeScript errors
      const { id, email_addresses, image_url, first_name, last_name, primary_email_address_id } = evt.data as UserJSON;

      if (!id) return NextResponse.json({ error: 'No user ID' }, { status: 400 });

      // Extract email properly
      let email = "";
      if (email_addresses && email_addresses.length > 0) {
        const primaryEmail = email_addresses.find((e) => e.id === primary_email_address_id);
        email = primaryEmail?.email_address || email_addresses[0].email_address;
      }

      const fullName = `${first_name || ''} ${last_name || ''}`.trim() || "New User";

      // Database Operation
      const referralCode = eventType === 'user.created' ? await generateUniqueReferralCode() : undefined;

      console.log(`[WEBHOOK] Attempting DB save for: ${email}`);

      const user = await prisma.user.upsert({
        where: { clerkId: id },
        update: {
          email: email,
          name: fullName,
          imageUrl: image_url || null,
        },
        create: {
          clerkId: id,
          email: email,
          name: fullName,
          imageUrl: image_url || null,
          plan: 'FREE',
          credits: 3,
          referralCode: referralCode || `REF-${id.slice(-5)}`,
        }
      });

      console.log('[WEBHOOK SUCCESS] User synced with DB:', user.id);

      return NextResponse.json({ message: 'User synced', userId: user.id }, { status: 200 });
    }

    return NextResponse.json({ message: 'Event ignored' }, { status: 200 });

  } catch (error: any) {
    console.error('[WEBHOOK ERROR] Fatal:', error.message);
    return NextResponse.json({ error: 'Internal Error', details: error.message }, { status: 500 });
  }
}