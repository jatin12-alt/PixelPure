import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  // 1. Secret uthao
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env')
  }

  // 2. Headers verify karo
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', { status: 400 })
  }

  // 3. Payload read karo
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
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', { status: 400 })
  }

  const eventType = evt.type;

  // 4. Database Sync Logic
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data || {};

    if (!id) {
      console.log('No user ID found in webhook data');
      return new Response('No ID', { status: 400 });
    }

    const email = email_addresses && email_addresses.length > 0
      ? email_addresses[0].email_address
      : `user_${id}@placeholder.com`;

    try {
      await prisma.user.upsert({
        where: { clerkId: id as string },
        update: {
          email: email,
          name: `${first_name || ''} ${last_name || ''}`.trim() || "New User",
          imageUrl: (image_url as string) || "",
        },
        create: {
          clerkId: id as string,
          email: email,
          name: `${first_name || ''} ${last_name || ''}`.trim() || "New User",
          imageUrl: (image_url as string) || "",
          plan: 'FREE',
          credits: 3,
          referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        }
      });
      console.log(`User ${eventType === 'user.created' ? 'created' : 'updated'} in DB! 🎉`);
    } catch (error) {
      console.error('Database Error:', error);
      return new Response('DB Error but handled', { status: 200 });
    }
  }

  return new Response('Webhook processed', { status: 200 });
}