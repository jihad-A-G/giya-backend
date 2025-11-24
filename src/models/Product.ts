import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  price: string;
  image: string;
  images: string[];
  video?: string;
  description: string;
  features: string[];
  sizes: string[];
  colors: string[];
  availability: string;
  specifications: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
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
  features: {
    type: [String],
    required: true
  },
  sizes: {
    type: [String],
    default: []
  },
  colors: {
    type: [String],
    default: []
  },
  availability: {
    type: String,
    default: 'in-stock',
    enum: ['in-stock', 'out-of-stock', 'pre-order']
  },
  specifications: {
    type: Schema.Types.Mixed,
    default: {}
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

productSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Product = mongoose.model<IProduct>('Product', productSchema);
