import express from 'express';
import receiveUsersPrivateController from '../controllers/receiveUsersPrivateController.js';

const router = express.Router();

router.get('/users', receiveUsersPrivateController);

export default router;
