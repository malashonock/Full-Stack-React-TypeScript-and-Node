import express from 'express';
import userController from '../controllers/user.controller';
import { validateNewUser } from '../middleware/validation';

const router = express.Router();

router.post('/', validateNewUser, userController.registerUser);

export default router;