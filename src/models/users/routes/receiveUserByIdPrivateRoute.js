import express from 'express';
import receiveUserByIdPrivateController from '../controllers/receiveUserByIdPrivateController.js';

const router = express.Router();

router.get('/users/receiveUser', receiveUserByIdPrivateController);

export default router;
