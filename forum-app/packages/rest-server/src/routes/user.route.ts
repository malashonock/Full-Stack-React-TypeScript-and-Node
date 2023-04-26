import express from 'express';

import UserController from '../controllers/user.controller';
import { isAuthenticated } from '../middleware/auth';
import { validateUserFields } from '../middleware/validation/user.validation';

const router = express.Router();

router.post('/', validateUserFields, UserController.registerUser);
router.put('/', isAuthenticated, validateUserFields, UserController.updateUser);

export default router;
