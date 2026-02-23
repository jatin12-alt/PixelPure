import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) return new Response('No secret', { status: 500 })

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Missing svix headers', { status: 400 })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload);
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent
    } catch (err) {
      return new Response('Verification failed', { status: 400 })
    }

    const eventType = evt.type;

    if (eventType === 'user.created' || eventType === 'user.updated') {
      // @ts-ignore - TS ko bypass karne ka tarika
      const rawData: any = evt.data; 
      
      // Destructuring ki jagah direct access (Build pass karne ke liye)
      const id = rawData.id;
      const email_addresses = rawData.email_addresses;
      const image_url = rawData.image_url;
      const first_name = rawData.first_name;
      const last_name = rawData.last_name;

      if (!id) return new Response('No ID', { status: 400 });

      let email = "";
      if (email_addresses && Array.isArray(email_addresses) && email_addresses.length > 0) {
        email = email_addresses[0].email_address;
      }

      const fullName = `${first_name || ''} ${last_name || ''}`.trim() || "New User";

      await prisma.user.upsert({
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
          referralCode: `REF-${id.slice(-5)}`,
        }
      });

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}