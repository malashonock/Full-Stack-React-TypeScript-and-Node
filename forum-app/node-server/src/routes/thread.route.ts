import express from 'express';
import ThreadController from '../controllers/thread.controller';
import { isAuthenticated } from '../middleware/auth';
import { validateThreadFields } from '../middleware/validation/thread.validation';

const router = express.Router();

router.get('/', ThreadController.getAllThreads);
router.get('/:threadId', ThreadController.getThread);
router.post('/', isAuthenticated, validateThreadFields, ThreadController.createThread);
router.put('/:threadId', isAuthenticated, validateThreadFields, ThreadController.updateThread);

export default router;