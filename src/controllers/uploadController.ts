import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file received' });
      return;
    }

    const isImage = req.file.mimetype.startsWith('image/');
    const isVideo = req.file.mimetype.startsWith('video/');

    if (isImage) {
      const uploadsDir = path.join(__dirname, '../../uploads');
      const originalPath = req.file.path;
      const optimizedFileName = `optimized-${req.file.filename.replace(path.extname(req.file.filename), '.webp')}`;
      const optimizedPath = path.join(uploadsDir, optimizedFileName);

      await sharp(originalPath)
        .webp({ quality: 90, effort: 6 })
        .resize(2000, 2000, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .toFile(optimizedPath);

      fs.unlinkSync(originalPath);

      const fileUrl = `/uploads/${optimizedFileName}`;
      res.json({
        url: fileUrl,
        message: 'Image uploaded and optimized successfully',
        type: 'image',
      });
    } else if (isVideo) {
      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({
        url: fileUrl,
        message: 'Video uploaded successfully',
        type: 'video',
      });
    } else {
      res.status(400).json({ error: 'Unsupported file type' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
};
