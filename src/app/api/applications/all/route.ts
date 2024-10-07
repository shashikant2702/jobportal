// src/app/api/applications/all/route.ts
import { NextResponse } from 'next/server';
import connectMongo from '@/app/lib/mongodb';
import Job from '@/app/models/Jobs';
import JobApplication from '@/app/models/JobApplication';
import { verifyTokenAndFetchUser } from '@/app/middleware/auth'; // Assuming you have an auth utility

export async function GET(req: Request) {
  const user = await verifyTokenAndFetchUser(req);
  if (user instanceof NextResponse) return user;

  // Check if the user's role is "company"
  if (user.role !== 'company') {
    return NextResponse.json({ message: 'Only companies can view job applications' }, { status: 403 });
  }

  try {
    await connectMongo();

    // Find all jobs posted by the company
    const jobs = await Job.find({ postedBy: user._id }).select('_id title');
    if (!jobs.length) {
      return NextResponse.json({ message: 'No jobs found for this company' }, { status: 404 });
    }

    // Extract job IDs
    const jobIds = jobs.map(job => job._id);

    // Fetch all job applications for the jobs posted by the company
    const applications = await JobApplication.find({ job: { $in: jobIds } })
      .populate('applicant', 'email')  // Populate applicant email
      .populate('job', 'title')        // Populate job title
      .select('shortlisted interviewSchedule'); // Select only required fields

    // Respond with applications
    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
