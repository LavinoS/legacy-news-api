import express from 'express';
import registrationController from '../controllers/registrationController.js';

const router = express.Router();

router.post('/users/register', registrationController);

export default router;
