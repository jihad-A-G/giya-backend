import fs from 'fs';
import path from 'path';

export const deleteFile = (fileUrl: string): void => {
  if (!fileUrl || !fileUrl.startsWith('/uploads/')) {
    return;
  }

  try {
    const fileName = fileUrl.replace('/uploads/', '');
    const filePath = path.join(__dirname, '../../uploads', fileName);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

export const deleteMultipleFiles = (fileUrls: string[]): void => {
  fileUrls.forEach(url => deleteFile(url));
};
