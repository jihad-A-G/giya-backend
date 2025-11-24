import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { deleteFile, deleteMultipleFiles } from '../utils/fileUtils';

export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      category,
      location,
      year,
      image,
      images = [],
      video,
      description,
      services,
      highlights,
      stats,
      client,
      budget
    } = req.body;

    if (!title || !category || !location || !year || !image || !description || !services || !highlights || !stats) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const project = new Project({
      title,
      category,
      location,
      year,
      image,
      images,
      video,
      description,
      services,
      highlights,
      stats,
      client,
      budget,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      category,
      location,
      year,
      image,
      images = [],
      video,
      description,
      services,
      highlights,
      stats,
      client,
      budget
    } = req.body;

    const oldProject = await Project.findById(req.params.id);
    if (!oldProject) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    if (oldProject.image !== image) {
      deleteFile(oldProject.image);
    }
    if (oldProject.video && oldProject.video !== video) {
      deleteFile(oldProject.video);
    }
    const oldImages = oldProject.images || [];
    const removedImages = oldImages.filter(img => !images.includes(img));
    if (removedImages.length > 0) {
      deleteMultipleFiles(removedImages);
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        location,
        year,
        image,
        images,
        video,
        description,
        services,
        highlights,
        stats,
        client,
        budget,
        updatedAt: new Date(),
      },
      { new: true }
    );

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    deleteFile(project.image);
    if (project.images && project.images.length > 0) {
      deleteMultipleFiles(project.images);
    }
    if (project.video) {
      deleteFile(project.video);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
