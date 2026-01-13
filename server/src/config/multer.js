// src/config/multer.js 
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsDir = 'uploads';

// ensure uploads dir exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${baseName}-${unique}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  // basic example: allow pdf, images, docs
  const allowed = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Unsupported file type'), false);
  }
  cb(null, true);
};

export const uploadSingle = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
}).single('file'); // form field name = "file"
