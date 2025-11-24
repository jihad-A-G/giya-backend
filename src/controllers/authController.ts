import { Request, Response } from 'express';
import { User } from '../models/User';
import { verifyPassword, generateToken } from '../utils/auth';
import { AuthRequest } from '../middleware/auth';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const verifyToken = (req: AuthRequest, res: Response): void => {
  res.json({ user: req.user });
};
