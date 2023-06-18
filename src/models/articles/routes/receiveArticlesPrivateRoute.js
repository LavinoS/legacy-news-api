import express from 'express';
import receiveArticlesPrivateController from '../controllers/receiveArticlesPrivateController.js';

const router = express.Router();

router.get('/articles/receiveArticles', receiveArticlesPrivateController);

export default router;
