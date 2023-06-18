import express from 'express';
import createNewViewPublicController from '../controllers/createNewViewPublicController.js';

const router = express.Router();

router.post('/views', createNewViewPublicController);

export default router;
