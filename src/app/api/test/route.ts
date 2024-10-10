// src/app/api/test/route.ts

import { verifyTokenAndFetchUser } from '@/app/middleware/auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Return a simple JSON response
  console.log(req)
  const user = await verifyTokenAndFetchUser(req);
  console.log(user.role);
  return NextResponse.json({ message: 'Hello, World!' });
}
