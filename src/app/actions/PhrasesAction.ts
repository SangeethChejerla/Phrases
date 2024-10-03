// app/actions/PhrasesAction.ts
'use server';

import { db } from '@/db/index';
import { phrases } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { and, desc, eq } from 'drizzle-orm';

export async function addPhrase(date: string, phrase: string) {
  const { userId } = auth();
  if (!userId) {
    return { error: 'Unauthorized' };
  }

  const parsedDate = new Date(date);

  try {
    const result = await db
      .insert(phrases)
      .values({
        date: parsedDate,
        userId,
        phrase,
      })
      .onConflictDoUpdate({
        target: [phrases.date, phrases.userId],
        set: { phrase, updatedAt: new Date() },
      })
      .returning();

    return { data: result[0] };
  } catch (error) {
    console.error('Error saving phrase:', error);
    return { error: 'Failed to save phrase' };
  }
}

export async function getPhraseForDate(date: string) {
  const { userId } = auth();
  if (!userId) {
    return { error: 'Unauthorized' };
  }

  const parsedDate = new Date(date);

  try {
    const result = await db
      .select()
      .from(phrases)
      .where(and(eq(phrases.userId, userId), eq(phrases.date, parsedDate)))
      .limit(1);

    return { data: result[0] || null };
  } catch (error) {
    console.error('Error fetching phrase:', error);
    return { error: 'Failed to fetch phrase' };
  }
}

export async function getPhrases() {
  const { userId } = auth();
  if (!userId) {
    return { error: 'Unauthorized' };
  }

  try {
    const result = await db
      .select()
      .from(phrases)
      .where(eq(phrases.userId, userId))
      .orderBy(desc(phrases.date))
      .limit(30);

    return { data: result };
  } catch (error) {
    console.error('Error fetching phrases:', error);
    return { error: 'Failed to fetch phrases' };
  }
}
