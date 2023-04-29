import express from 'express';
import deleteArticleByIdPrivateController from '../controllers/deleteArticleByIdPrivateController.js';

const router = express.Router();

router.delete('/articles', deleteArticleByIdPrivateController);

export default router;
