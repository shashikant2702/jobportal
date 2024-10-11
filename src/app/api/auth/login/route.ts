import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import connectMongo from '@/app/lib/mongodb'; // Adjust the path according to your project structure
import User from '@/app/models/User';        // Adjust the path according to your project structure

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Please provide both email and password' }, { status: 400 });
    }

    await connectMongo(); // Connect to MongoDB

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    
    const response = NextResponse.json({ token }, { status: 200 });

    // Set the token cookie (httpOnly)
    response.cookies.set('token', token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
      sameSite: 'lax', // Adjust based on your cross-site needs ('Lax' or 'None')
      path: '/', // Cookie available throughout the entire site
      maxAge: 60 * 60, // 1 hour in seconds
    });

    // Set the role cookie (not httpOnly, so it can be accessed by client-side code if needed)
    response.cookies.set('role', user.role, {
      httpOnly: false, // Can be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
      sameSite: 'lax',
      path: '/', // Cookie available throughout the entire site
      maxAge: 60 * 60, // 1 hour in seconds
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
