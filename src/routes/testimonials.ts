import { Router } from 'express';
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);
router.post('/', authenticateToken, requireAdmin, createTestimonial);
router.put('/:id', authenticateToken, requireAdmin, updateTestimonial);
router.delete('/:id', authenticateToken, requireAdmin, deleteTestimonial);

export default router;
