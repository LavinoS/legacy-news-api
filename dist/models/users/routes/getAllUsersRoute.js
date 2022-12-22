import express from 'express';
import getAllUsersController from '../controllers/getAllUsersController.js';
const router = express.Router();
router.get('/users', getAllUsersController);
export default router;