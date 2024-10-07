import mongoose, { Schema, model, models } from 'mongoose';

const jobApplicationSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: 'Job', required: true }, // Reference to the Job
  applicant: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User who applied
  shortlisted: { type: Boolean, default: false }, // Whether the applicant is shortlisted
  interviewSchedule: { type: String, default: '' }, // Google Meet interview link
}, { timestamps: true });

const JobApplication = models.JobApplication || model('JobApplication', jobApplicationSchema);
export default JobApplication;
