import { Router } from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', authenticateToken, requireAdmin, createService);
router.put('/:id', authenticateToken, requireAdmin, updateService);
router.delete('/:id', authenticateToken, requireAdmin, deleteService);

export default router;
