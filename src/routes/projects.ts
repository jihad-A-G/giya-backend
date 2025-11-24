import { Router } from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', authenticateToken, requireAdmin, createProject);
router.put('/:id', authenticateToken, requireAdmin, updateProject);
router.delete('/:id', authenticateToken, requireAdmin, deleteProject);

export default router;
