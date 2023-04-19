import express from 'express';

import ThreadController from '../controllers/thread.controller';
import ThreadCommentController from '../controllers/thread-comment.controller';
import { isAuthenticated } from '../middleware/auth';
import { validateThreadFields } from '../middleware/validation/thread.validation';
import { validateThreadCommentFields } from '../middleware/validation/thread-comment.validation';

const router = express.Router();

router.get('/', ThreadController.getAllThreads);
router.post('/', isAuthenticated, validateThreadFields, ThreadController.createThread);

router.get('/:threadId', ThreadController.getThread);
router.put('/:threadId', isAuthenticated, validateThreadFields, ThreadController.updateThread);
router.post('/:threadId/view', ThreadController.viewThread);

router.get('/:threadId/comments', ThreadCommentController.getThreadComments);
router.post('/:threadId/comments', isAuthenticated, validateThreadCommentFields, ThreadCommentController.createComment);

router.get('/:threadId/comments/:commentId', ThreadCommentController.getComment);
router.put('/:threadId/comments/:commentId', isAuthenticated, validateThreadCommentFields, ThreadCommentController.updateComment);
router.post('/:threadId/comments/:commentId/view', ThreadCommentController.viewComment);

export default router;