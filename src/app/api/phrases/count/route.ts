// app/api/phrases/count/route.ts
'use server';

import { db } from '@/db';
import { phrases } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import { count, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const results = await db
    .select({
      date: phrases.date,
      count: count(phrases.id),
    })
    .from(phrases)
    .where(eq(phrases.userId, userId))
    .groupBy(phrases.date);
  const c = results.map((item) => ({ date: item.date, count: item.count }));
  console.log(c);
  return NextResponse.json(results);
}
