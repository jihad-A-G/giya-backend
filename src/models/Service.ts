import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  icon: string;
  description: string;
  features: string[];
  process: string[];
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    required: true
  },
  process: {
    type: [String],
    required: true
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

serviceSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Service = mongoose.model<IService>('Service', serviceSchema);
