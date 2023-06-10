import express from 'express';
import deleteUserByIdPrivateController from '../controllers/deleteUserByIdPrivateController';

const router = express.Router();

router.delete('/users', deleteUserByIdPrivateController);

export default router;
