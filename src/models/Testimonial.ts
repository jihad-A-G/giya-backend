import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  content: string;
  rating: number;
  createdAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
