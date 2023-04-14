import express from 'express';
import userController from '../controllers/user.controller';
import { isAuthenticated } from '../middleware/auth';
import { validateNewUser, validateUpdatedUser } from '../middleware/validation';

const router = express.Router();

router.post('/', validateNewUser, userController.registerUser);
router.put('/', isAuthenticated, validateUpdatedUser, userController.updateUser);

export default router;