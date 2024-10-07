// src/app/api/jobs/[id]/route.ts

import { NextResponse } from 'next/server';
import connectMongo from '@/app/lib/mongodb';
import Job from '@/app/models/Jobs';
import { verifyTokenAndFetchUser } from '@/app/middleware/auth';

// Update a job (only the company that posted it can update)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const user = await verifyTokenAndFetchUser(req);
  if (user instanceof NextResponse) return user;

  // Check if the user's role is "company"
  if (user.role !== 'company') {
    return NextResponse.json({ message: 'Only companies can update job postings' }, { status: 403 });
  }

  try {
    const { title, description } = await req.json();
    await connectMongo();

    const job = await Job.findById(params.id);
    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    // Only the company that posted the job can update it
    if (job.postedBy.toString() !== user._id.toString()) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    job.title = title || job.title;
    job.description = description || job.description;

    await job.save();
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating job' }, { status: 500 });
  }
}

// Delete a job (only the company that posted it can delete)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const user = await verifyTokenAndFetchUser(req);
    if (user instanceof NextResponse) return user;
  
    // Check if the user's role is "company"
    if (user.role !== 'company') {
      return NextResponse.json({ message: 'Only companies can delete job postings' }, { status: 403 });
    }
  
    try {
      await connectMongo();
  
      const job = await Job.findById(params.id);
      if (!job) {
        return NextResponse.json({ message: 'Job not found' }, { status: 404 });
      }
  
      // Only the company that posted the job can delete it
      if (job.postedBy.toString() !== user._id.toString()) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
      }
  
      // Use findByIdAndDelete instead of remove()
      await Job.findByIdAndDelete(params.id);
  
      return NextResponse.json({ message: 'Job deleted' });
    } catch (error) {
      console.error(error); // Log the actual error for debugging
      return NextResponse.json({ message: 'Error deleting job' }, { status: 500 });
    }
}