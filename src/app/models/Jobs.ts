import mongoose, { Schema, model, models } from 'mongoose';

const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the company
}, { timestamps: true });

const Job = models.Job || model('Job', jobSchema);
export default Job;
