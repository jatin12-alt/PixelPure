import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Ensure this route is not cached and runs on Node.js runtime
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  // Get the Svix headers for verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing Svix headers');
    return NextResponse.json(
      { error: 'Missing Svix headers' },
      { status: 400 }
    );
  }

  // Get the request body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with the webhook secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the webhook payload
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json(
      { error: 'Webhook verification failed' },
      { status: 400 }
    );
  }

  const eventType = evt.type;
  console.log(`Webhook received: ${eventType}`);

  // Handle user creation and updates
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    if (!id) {
      console.error('No user ID found in webhook data');
      return NextResponse.json(
        { error: 'No user ID provided' },
        { status: 400 }
      );
    }

    // Extract email from the email_addresses array
    const email = email_addresses && email_addresses.length > 0
      ? email_addresses[0].email_address
      : null;

    if (!email) {
      console.error('No email found for user:', id);
      return NextResponse.json(
        { error: 'No email provided' },
        { status: 400 }
      );
    }

    // Build the user's full name
    const fullName = `${first_name || ''} ${last_name || ''}`.trim() || "New User";

    try {
      // Upsert the user in the database
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
          referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
        }
      });

      console.log(`User ${eventType === 'user.created' ? 'created' : 'updated'} successfully:`, user.id);
      
      return NextResponse.json(
        { message: `User ${eventType === 'user.created' ? 'created' : 'updated'} successfully`, userId: user.id },
        { status: 200 }
      );
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Database operation failed', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }
  }

  // Return success for other event types
  return NextResponse.json(
    { message: 'Webhook processed' },
    { status: 200 }
  );
}