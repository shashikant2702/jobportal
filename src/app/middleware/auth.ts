import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import User from '../models/User';
import connectMongo from '../lib/mongodb';

// Verify token and fetch the user from the database
export async function verifyTokenAndFetchUser(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Authorization header is missing' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1]; // Assuming 'Bearer <token>'
  if (!token) {
    return NextResponse.json({ message: 'Token is missing' }, { status: 401 });
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    await connectMongo();

    // Fetch the user based on the decoded ID
    const user = await User.findById((decoded as any).id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return user; // Return the user object, which contains the role and other info
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
