import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import User from '../models/User';
import connectMongo from '../lib/mongodb';
import { cookies } from 'next/headers';

// Verify token and fetch the user from the database
export async function verifyTokenAndFetchUser(req: Request) {
  console.log('inside middleware');
  
  // 1. Try to get the token from the Authorization header
  const authHeader = req.headers.get('authorization');
  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
  }

  // 2. If no token in header, try to get it from cookies
  if (!token) {
    const cookieStore = cookies();
    token = cookieStore.get('token')?.value; // Check for token in cookies
  }

  // 3. If still no token, return an error response
  if (!token) {
    return NextResponse.json({ message: 'Token is missing' }, { status: 401 });
  }

  try {
    // 4. Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    await connectMongo();

    // 5. Fetch the user based on the decoded ID
    const user = await User.findById((decoded as any).id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // 6. Return the user object
    return user;
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
