import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { deleteFile, deleteMultipleFiles } from '../utils/fileUtils';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      category,
      price,
      image,
      images = [],
      video,
      description,
      features,
      sizes = [],
      colors = [],
      availability = 'in-stock',
      specifications = {}
    } = req.body;

    if (!name || !category || !price || !image || !description || !features) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const product = new Product({
      name,
      category,
      price,
      image,
      images,
      video,
      description,
      features,
      sizes,
      colors,
      availability,
      specifications,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      category,
      price,
      image,
      images = [],
      video,
      description,
      features,
      sizes = [],
      colors = [],
      availability = 'in-stock',
      specifications = {}
    } = req.body;

    if (!name || !category || !price || !image || !description || !Array.isArray(features)) {
      res.status(400).json({ error: 'Missing required fields or invalid features format' });
      return;
    }

    const oldProduct = await Product.findById(req.params.id);
    if (!oldProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    if (oldProduct.image !== image) {
      deleteFile(oldProduct.image);
    }
    if (oldProduct.video && oldProduct.video !== video) {
      deleteFile(oldProduct.video);
    }
    const oldImages = oldProduct.images || [];
    const removedImages = oldImages.filter(img => !images.includes(img));
    if (removedImages.length > 0) {
      deleteMultipleFiles(removedImages);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        price,
        image,
        images,
        video,
        description,
        features,
        sizes,
        colors,
        availability,
        specifications,
        updatedAt: new Date(),
      },
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    deleteFile(product.image);
    if (product.images && product.images.length > 0) {
      deleteMultipleFiles(product.images);
    }
    if (product.video) {
      deleteFile(product.video);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
