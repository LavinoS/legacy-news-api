import express from 'express';
import editArticleByIdPrivateController from '../controllers/editArticleByIdPrivateController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.put('/articles/edit', upload.single('featuredImage'), editArticleByIdPrivateController);

export default router;
