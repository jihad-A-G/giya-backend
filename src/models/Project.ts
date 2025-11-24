import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  category: string;
  location: string;
  year: number;
  image: string;
  images: string[];
  video?: string;
  description: string;
  services: string[];
  highlights: string[];
  stats: Record<string, any>;
  client?: string;
  budget?: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  video: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  services: {
    type: [String],
    required: true
  },
  highlights: {
    type: [String],
    required: true
  },
  stats: {
    type: Schema.Types.Mixed,
    required: true
  },
  client: {
    type: String
  },
  budget: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Project = mongoose.model<IProject>('Project', projectSchema);
