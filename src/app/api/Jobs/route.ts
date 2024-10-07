// src/app/api/jobs/route.ts

import { NextResponse } from 'next/server';
import connectMongo from '@/app/lib/mongodb';
import Job from '@/app/models/Jobs';
import { verifyTokenAndFetchUser } from '@/app/middleware/auth';


export async function GET() {
    try {
      await connectMongo();
      const jobs = await Job.find().populate('postedBy');
      return NextResponse.json(jobs);
    } catch (error) {
      return NextResponse.json({ message: 'Error fetching jobs' }, { status: 500 });
    }
}

// Create a new job (only companies can post jobs)
export async function POST(req: Request) {
  const user = await verifyTokenAndFetchUser(req);
  if (user instanceof NextResponse) return user; // Return the error if verification fails

  // Check if the user's role is "company"
  if (user.role !== 'company') {
    return NextResponse.json({ message: 'Only companies can create job postings' }, { status: 403 });
  }

  try {
    const { title, description } = await req.json();
    await connectMongo();

    const newJob = new Job({
      title,
      description,
      postedBy: user._id, // Assign the current user's ID
    });

    await newJob.save();
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating job' }, { status: 500 });
  }
}
