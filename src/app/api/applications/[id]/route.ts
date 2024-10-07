import { verifyTokenAndFetchUser } from "@/app/middleware/auth";
import { NextResponse } from "next/server";
import connectMongo from "@/app/lib/mongodb";
import Job from "@/app/models/Jobs";
import JobApplication from "@/app/models/JobApplication";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const user = await verifyTokenAndFetchUser(req);
    if (user instanceof NextResponse) return user;
  
    // Only companies can view applications
    if (user.role !== 'company') {
      return NextResponse.json({ message: 'Only companies can view job applications' }, { status: 403 });
    }
  
    try {
      await connectMongo();
  
      // Check if the job belongs to the company
      const job = await Job.findById(params.id);
      if (!job  ) {
        return NextResponse.json({ message: ' job not found' }, { status: 403 });
      } 
      if(job.postedBy.toString() !== user._id.toString()){
        return NextResponse.json({ message: 'Unauthorized ' }, { status: 403 })
      }
  
      // Fetch all applications for the job
      const applications = await JobApplication.find({ job: params.id })
        .populate('applicant', 'email') // Populate applicant email
        .select('shortlisted interviewSchedule'); // Return only relevant fields
  
      return NextResponse.json(applications, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
  }
  export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const user = await verifyTokenAndFetchUser(req);
    if (user instanceof NextResponse) return user;
  
    // Only companies can update applications
    if (user.role !== 'company') {
      return NextResponse.json({ message: 'Only companies can update job applications' }, { status: 403 });
    }
  
    const { shortlisted, interviewSchedule } = await req.json();
  
    try {
      await connectMongo();
  
      // Find the application
      const application = await JobApplication.findById(params.id).populate('job');
      if (!application) {
        return NextResponse.json({ message: 'Application not found' }, { status: 404 });
      }
  
      // Only the company that posted the job can update the application
      if (application.job.postedBy.toString() !== user._id.toString()) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
      }
  
      // Update the application
      application.shortlisted = shortlisted;
      application.interviewSchedule = interviewSchedule || application.interviewSchedule;
      await application.save();
  
      return NextResponse.json({ message: 'Application updated' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Server error'}, { status: 500 });
    }
  }
  