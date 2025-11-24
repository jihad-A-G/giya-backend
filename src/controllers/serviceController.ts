import { Request, Response } from 'express';
import { Service } from '../models/Service';

export const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

export const getServiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
};

export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, icon, description, features, process } = req.body;

    if (!title || !icon || !description || !features || !process) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const service = new Service({
      title,
      icon,
      description,
      features,
      process,
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service' });
  }
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, icon, description, features, process } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title,
        icon,
        description,
        features,
        process,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
};
