import { models } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import connectMongo from '@/app/lib/mongodb';  // Adjust the path according to your project structure
import User from '@/app/models/User';        // Adjust the path according to your project structure

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role, companyName, applicantName } = body;

    if (!email || !password || !role) {
      return NextResponse.json({ message: 'Please provide all required fields' }, { status: 400 });
    }

    await connectMongo(); // Connect to MongoDB

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      companyName: role === 'company' ? companyName : undefined,
      applicantName: role === 'applicant' ? applicantName : undefined,
    });

    await newUser.save();

    // Generate a JWT token for the user
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
