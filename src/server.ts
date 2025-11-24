import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/database';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import projectRoutes from './routes/projects';
import serviceRoutes from './routes/services';
import testimonialRoutes from './routes/testimonials';
import uploadRoutes from './routes/upload';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use((req: Request, res: Response, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Giya Furniture API' });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

startServer();
