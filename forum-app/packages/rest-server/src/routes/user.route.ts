import express from 'express';

import UserController from '../controllers/user.controller';
import ThreadController from '../controllers/thread.controller';
import { isAuthenticated, isAuthorized } from '../middleware/auth';
import { validateUserFields } from '../middleware/validation/user.validation';
import ThreadCommentController from '../controllers/thread-comment.controller';

const router = express.Router();

router.post('/', validateUserFields, UserController.registerUser);
router.put(
  '/:userId',
  isAuthenticated,
  isAuthorized,
  validateUserFields,
  UserController.updateUser,
);

router.get(
  '/:userId/threads',
  isAuthenticated,
  isAuthorized,
  ThreadController.getUserThreads,
);
router.get(
  '/:userId/comments',
  isAuthenticated,
  isAuthorized,
  ThreadCommentController.getUserComments,
);

router.get(
  '/:userId/threads/:threadId/vote',
  isAuthenticated,
  isAuthorized,
  ThreadController.getUserThreadVote,
);
router.get(
  '/:userId/comments/:commentId/vote',
  isAuthenticated,
  isAuthorized,
  ThreadCommentController.getUserCommentVote,
);

export default router;
