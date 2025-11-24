import dotenv from 'dotenv';
import { User } from '../models/User';
import { hashPassword } from '../utils/auth';
import { connectDB } from '../config/database';

dotenv.config();

const initializeAdmin = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected successfully');

    const adminEmail = 'admin@giya.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      console.log('Creating admin user...');
      const hashedPassword = await hashPassword('giya@123');
      const admin = new User({
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      await admin.save();
      console.log('Admin user created successfully');
      console.log(`Email: ${adminEmail}`);
      console.log('Password: giya@123');
    } else {
      console.log('Admin user already exists');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error initializing admin:', error);
    process.exit(1);
  }
};

initializeAdmin();
