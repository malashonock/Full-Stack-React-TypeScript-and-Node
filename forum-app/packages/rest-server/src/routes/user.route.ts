import express from 'express';

import UserController from '../controllers/user.controller';
import ThreadController from '../controllers/thread.controller';
import { isAuthenticated } from '../middleware/auth';
import { validateUserFields } from '../middleware/validation/user.validation';
import ThreadCommentController from '../controllers/thread-comment.controller';

const router = express.Router();

router.post('/', validateUserFields, UserController.registerUser);
router.put(
  '/:userId',
  isAuthenticated,
  validateUserFields,
  UserController.updateUser,
);

router.get('/:userId/threads', ThreadController.getUserThreads);
router.get('/:userId/comments', ThreadCommentController.getUserComments);

export default router;
