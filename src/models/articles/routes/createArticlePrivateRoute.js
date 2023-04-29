import express from 'express';
import createArticlePrivateController from '../controllers/createArticlePrivateController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/articles/create', upload.single('featuredImage'), createArticlePrivateController);

export default router;
