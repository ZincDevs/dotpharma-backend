import express from 'express';
import FileUploader from '../helpers/cloudinary/UploadFile';
// import Auth from '../middleware/Auth';

const router = express.Router();
// Here user is added by admin
router.post(
  '/upload',
  FileUploader.upload
);

export default router;
