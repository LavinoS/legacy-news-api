import express from 'express';
import updateArticleStatusPrivateController from '../controllers/updateArticleStatusPrivateController.js';

const router = express.Router();

router.put('/articles', updateArticleStatusPrivateController);

export default router;
