import express from 'express';

import UserController from '../controllers/user.controller';
import ThreadController from '../controllers/thread.controller';
import { isAuthenticated } from '../middleware/auth';
import { validateUserFields } from '../middleware/validation/user.validation';

const router = express.Router();

router.post('/', validateUserFields, UserController.registerUser);
router.put(
  '/:userId',
  isAuthenticated,
  validateUserFields,
  UserController.updateUser,
);

router.get('/:userId/threads', ThreadController.getUserThreads);

export default router;
