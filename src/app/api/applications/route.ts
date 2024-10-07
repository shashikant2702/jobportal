import connectMongo from '@/app/lib/mongodb';
import JobApplication from '@/app/models/JobApplication';
import Job from '@/app/models/Jobs';
import { verifyTokenAndFetchUser } from '@/app/middleware/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const user = await verifyTokenAndFetchUser(req);
  if (user instanceof NextResponse) return user;

  // Only applicants can apply for jobs
  if (user.role !== 'applicant') {
    return NextResponse.json({ message: 'Only applicants can apply for jobs' }, { status: 403 });
  }

  const { jobId } = await req.json();

  try {
    await connectMongo();

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    // Check if the applicant already applied
    const existingApplication = await JobApplication.findOne({ job: jobId, applicant: user._id });
    if (existingApplication) {
      return NextResponse.json({ message: 'You have already applied for this job' }, { status: 400 });
    }

    // Create new job application
    const application = new JobApplication({ job: jobId, applicant: user._id });
    await application.save();

    return NextResponse.json({ message: 'Job application submitted' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error'}, { status: 500 });
  }
}

export async function GET(req: Request) {
    const user = await verifyTokenAndFetchUser(req);
    if (user instanceof NextResponse) return user;
  
    // Only applicants can view their applications
    if (user.role !== 'applicant') {
      return NextResponse.json({ message: 'Only applicants can view their applications' }, { status: 403 });
    }
  
    try {
      await connectMongo();
  
      // Fetch all applications by the user
      const applications = await JobApplication.find({ applicant: user._id })
        .populate('job', 'title') // Populate job title
        .select('shortlisted interviewSchedule'); // Return only relevant fields
  
      return NextResponse.json(applications, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
  }
  