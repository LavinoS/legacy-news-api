import express from 'express';
import receiveStatisticsPrivateController from '../controllers/receiveStatisticsPrivateController.js';

const router = express.Router();

router.get('/statistics', receiveStatisticsPrivateController);

export default router;
