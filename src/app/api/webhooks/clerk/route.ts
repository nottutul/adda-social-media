
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { db } from '@/index'
import { usersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { UserJSON } from '@clerk/nextjs/server'

async function syncUserCreated(data: UserJSON) {
  const { id, email_addresses, username: rawUsername, first_name: firstName, last_name: lastName, image_url: avatar } = data;
  const email = email_addresses?.[0]?.email_address;

  if (!email) {
    throw new Error('Email address is required to sync user');
  }

  // Handle case where username is not provided by Clerk
  const username = rawUsername || email.split('@')[0] || `user_${id.substring(0, 8)}`;

  await db.insert(usersTable)
    .values({
      id,
      username,
      email,
      firstName,
      lastName,
      avatar,
    })
    .onConflictDoUpdate({
      target: usersTable.id,
      set: {
        username,
        email,
        firstName,
        lastName,
        avatar,
      },
    });
}

async function syncUserUpdated(data: UserJSON) {
  const { id, email_addresses, username: rawUsername, first_name: firstName, last_name: lastName, image_url: avatar } = data;
  const email = email_addresses?.[0]?.email_address;

  if (!email) {
    throw new Error('Email address is required to sync user');
  }

  const username = rawUsername || email.split('@')[0] || `user_${id.substring(0, 8)}`;

  await db.update(usersTable)
    .set({
      username,
      email,
      firstName,
      lastName,
      avatar,
    })
    .where(eq(usersTable.id, id));
}

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)
    const eventType = evt.type

    if (eventType === 'user.created') {
      await syncUserCreated(evt.data)
    } else if (eventType === 'user.updated') {
      await syncUserUpdated(evt.data)
    }

    return new Response('Webhook processed successfully', { status: 200 })
  } catch (err) {
    console.error('Error processing webhook:', err)
    const errorMessage = err instanceof Error ? err.message : 'Error processing webhook'
    return new Response(errorMessage, { status: 400 })
  }
}


