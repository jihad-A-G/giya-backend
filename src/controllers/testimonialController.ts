import { Request, Response } from 'express';
import { Testimonial } from '../models/Testimonial';

export const getAllTestimonials = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

export const getTestimonialById = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonial' });
  }
};

export const createTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role, content, rating } = req.body;

    if (!name || !role || !content || rating === undefined) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const testimonial = new Testimonial({
      name,
      role,
      content,
      rating,
    });

    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

export const updateTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role, content, rating } = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        name,
        role,
        content,
        rating,
      },
      { new: true }
    );

    if (!testimonial) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }

    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
};

export const deleteTestimonial = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};
