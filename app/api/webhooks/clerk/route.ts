import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Ensure this route is not cached and runs on Node.js runtime
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Helper function to generate unique referral code
async function generateUniqueReferralCode(): Promise<string> {
  let code: string;
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
    // Fallback: use timestamp-based code if random generation fails
    code = `REF${Date.now().toString(36).toUpperCase().slice(-5)}`;
  }

  return code!;
}

export async function POST(req: Request) {
  const startTime = Date.now();
  let eventType: string | null = null;
  let clerkUserId: string | null = null;

  try {
    // Get the webhook secret from environment variables
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
      console.error('[WEBHOOK ERROR] CLERK_WEBHOOK_SECRET is not set in environment variables');
      return NextResponse.json(
        { error: 'Webhook secret not configured', timestamp: new Date().toISOString() },
        { status: 500 }
      );
    }

    // Get the Svix headers for verification
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('[WEBHOOK ERROR] Missing Svix headers', {
        has_svix_id: !!svix_id,
        has_svix_timestamp: !!svix_timestamp,
        has_svix_signature: !!svix_signature,
      });
      return NextResponse.json(
        { error: 'Missing Svix headers', timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    // Get the request body
    let payload: any;
    try {
      payload = await req.json();
    } catch (err) {
      console.error('[WEBHOOK ERROR] Failed to parse request body:', err);
      return NextResponse.json(
        { error: 'Invalid JSON payload', timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

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
      console.error('[WEBHOOK ERROR] Webhook verification failed:', {
        error: err instanceof Error ? err.message : String(err),
        svix_id,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Webhook verification failed', timestamp: new Date().toISOString() },
        { status: 400 }
      );
    }

    eventType = evt.type;
    clerkUserId = evt.data?.id || null;

    console.log(`[WEBHOOK] Event received: ${eventType}`, {
      clerkUserId,
      timestamp: new Date().toISOString(),
    });

    // Handle user creation and updates
    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id, email_addresses, image_url, first_name, last_name } = evt.data;

      if (!id) {
        console.error('[WEBHOOK ERROR] No user ID in webhook data', {
          eventType,
          dataKeys: Object.keys(evt.data || {}),
          timestamp: new Date().toISOString(),
        });
        return NextResponse.json(
          { error: 'No user ID provided', timestamp: new Date().toISOString() },
          { status: 400 }
        );
      }

      // Extract email from the email_addresses array
      // Handle both test events and real events structure
      let email: string | null = null;
      
      if (email_addresses && Array.isArray(email_addresses) && email_addresses.length > 0) {
        // Find primary email or first verified email
        const primaryEmail = email_addresses.find((e: any) => e.id === evt.data.primary_email_address_id);
        const verifiedEmail = email_addresses.find((e: any) => e.verification?.status === 'verified');
        email = primaryEmail?.email_address || verifiedEmail?.email_address || email_addresses[0]?.email_address || null;
      }

      if (!email) {
        console.error('[WEBHOOK ERROR] No email found for user', {
          clerkUserId: id,
          eventType,
          email_addresses: email_addresses ? JSON.stringify(email_addresses) : 'null',
          timestamp: new Date().toISOString(),
        });
        return NextResponse.json(
          { error: 'No email provided', clerkUserId: id, timestamp: new Date().toISOString() },
          { status: 400 }
        );
      }

      // Build the user's full name
      const fullName = `${first_name || ''} ${last_name || ''}`.trim() || "New User";

      try {
        // Generate unique referral code for new users
        const referralCode = eventType === 'user.created' 
          ? await generateUniqueReferralCode()
          : undefined;

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
            referralCode: referralCode,
          }
        });

        const duration = Date.now() - startTime;
        console.log(`[WEBHOOK SUCCESS] User ${eventType === 'user.created' ? 'created' : 'updated'}`, {
          userId: user.id,
          clerkId: id,
          email: email,
          eventType,
          duration: `${duration}ms`,
          timestamp: new Date().toISOString(),
        });
        
        return NextResponse.json(
          { 
            message: `User ${eventType === 'user.created' ? 'created' : 'updated'} successfully`, 
            userId: user.id,
            clerkId: id,
            timestamp: new Date().toISOString(),
          },
          { status: 200 }
        );
      } catch (error) {
        const duration = Date.now() - startTime;
        console.error('[WEBHOOK ERROR] Database operation failed', {
          error: error instanceof Error ? error.message : String(error),
          errorStack: error instanceof Error ? error.stack : undefined,
          clerkUserId: id,
          email: email,
          eventType,
          duration: `${duration}ms`,
          timestamp: new Date().toISOString(),
        });

        // Check for specific Prisma errors
        if (error instanceof Error) {
          // Unique constraint violation
          if (error.message.includes('Unique constraint') || error.message.includes('UniqueViolation')) {
            console.error('[WEBHOOK ERROR] Unique constraint violation - user may already exist', {
              clerkId: id,
              email: email,
            });
            // Try to find existing user
            try {
              const existingUser = await prisma.user.findUnique({
                where: { clerkId: id },
              });
              if (existingUser) {
                console.log('[WEBHOOK] User already exists, returning success', {
                  userId: existingUser.id,
                  clerkId: id,
                });
                return NextResponse.json(
                  { message: 'User already exists', userId: existingUser.id, timestamp: new Date().toISOString() },
                  { status: 200 }
                );
              }
            } catch (findError) {
              console.error('[WEBHOOK ERROR] Failed to find existing user:', findError);
            }
          }
        }

        return NextResponse.json(
          { 
            error: 'Database operation failed', 
            details: error instanceof Error ? error.message : 'Unknown error',
            clerkUserId: id,
            timestamp: new Date().toISOString(),
          },
          { status: 500 }
        );
      }
    }

    // Return success for other event types
    const duration = Date.now() - startTime;
    console.log(`[WEBHOOK] Event processed (not user.created/updated)`, {
      eventType,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: 'Webhook processed', eventType, timestamp: new Date().toISOString() },
      { status: 200 }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('[WEBHOOK ERROR] Unexpected error', {
      error: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
      eventType,
      clerkUserId,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}