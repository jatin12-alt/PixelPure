import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, UserJSON } from '@clerk/nextjs/server' // UserJSON import kiya hai
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
      return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
    }

    const eventType = evt.type;

    // --- YAHAN HAI FIX ---
    if (eventType === 'user.created' || eventType === 'user.updated') {
      // TypeScript ko batana padta hai ki ye data User type ka hi hai
      const userData = evt.data as UserJSON; 
      
      const id = userData.id;
      const email_addresses = userData.email_addresses;
      const image_url = userData.image_url;
      const first_name = userData.first_name;
      const last_name = userData.last_name;
      const primary_email_id = userData.primary_email_address_id;

      if (!id) return NextResponse.json({ error: 'No user ID' }, { status: 400 });

      let email = "";
      if (email_addresses && email_addresses.length > 0) {
        const primaryEmail = email_addresses.find((e) => e.id === primary_email_id);
        email = primaryEmail?.email_address || email_addresses[0].email_address;
      }

      const fullName = `${first_name || ''} ${last_name || ''}`.trim() || "New User";
      const referralCode = eventType === 'user.created' ? await generateUniqueReferralCode() : undefined;

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

      return NextResponse.json({ message: 'User synced', userId: user.id }, { status: 200 });
    }

    return NextResponse.json({ message: 'Event ignored' }, { status: 200 });

  } catch (error: any) {
    console.error('[WEBHOOK ERROR]:', error.message);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}