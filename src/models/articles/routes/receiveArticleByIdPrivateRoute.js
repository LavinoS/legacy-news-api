import express from 'express';
import receiveArticleByIdPrivateController from '../controllers/receiveArticleByIdPrivateController.js';

const router = express.Router();

router.get('/articles', receiveArticleByIdPrivateController);

export default router;
