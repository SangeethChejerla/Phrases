// app/api/phrases/route.ts

'use server';

import { db } from '@/db';
import { phrases } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { date, phrase } = await req.json();
  const { userId } = auth();

  if (!userId || !date || !phrase) {
    return new NextResponse('Missing data', { status: 400 });
  }

  const result = await db.insert(phrases).values({
    userId,
    date: new Date(date),
    phrase,
  });

  return NextResponse.json({ message: 'Note added', data: result });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const { userId } = auth();

  if (!date || !userId) {
    return new NextResponse('Missing date or user ID', { status: 400 });
  }

  const notes = await db
    .select()
    .from(phrases)
    .where(and(eq(phrases.date, new Date(date)), eq(phrases.userId, userId)));

  return NextResponse.json(notes);
}

export async function PUT(req: Request) {
  const { id, phrase } = await req.json();
  const { userId } = auth();

  if (!userId || !id || !phrase) {
    return new NextResponse('Missing data', { status: 400 });
  }

  const existingPhrase = await db
    .select()
    .from(phrases)
    .where(and(eq(phrases.id, id), eq(phrases.userId, userId)))
    .limit(1);

  if (!existingPhrase) {
    return new NextResponse('Phrase not found', { status: 404 });
  }

  await db
    .update(phrases)
    .set({ phrase, updatedAt: new Date() })
    .where(eq(phrases.id, id));

  return NextResponse.json({ message: 'Note updated' });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const { userId } = auth();

  if (!userId || !id) {
    return new NextResponse('Missing data', { status: 400 });
  }

  const existingPhrase = await db
    .select()
    .from(phrases)
    .where(and(eq(phrases.id, id), eq(phrases.userId, userId)));

  if (existingPhrase.length === 0) {
    return new NextResponse('Phrase not found', { status: 404 });
  }

  await db.delete(phrases).where(eq(phrases.id, id));

  return NextResponse.json({ message: 'Note deleted' });
}
