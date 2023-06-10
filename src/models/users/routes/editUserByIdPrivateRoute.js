import express from 'express';
import editUserByIdPrivateController from '../controllers/editUserByIdPrivateController.js';

const router = express.Router();

router.post('/users/edit', editUserByIdPrivateController);

export default router;
