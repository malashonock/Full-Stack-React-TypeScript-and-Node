import express from 'express';

import ThreadCategoryController from '../controllers/thread-category.controller';
import ThreadController from '../controllers/thread.controller';
import { isAuthenticated } from '../middleware/auth';
import { validateThreadCategoryFields } from '../middleware/validation/thread-category.validation';

const router = express.Router();

router.get('/', ThreadCategoryController.getAllCategories);
router.post('/', isAuthenticated, validateThreadCategoryFields, ThreadCategoryController.createCategory);

router.get('/top-threads', ThreadController.getTopCategoryThreads);

router.get('/:categoryId', ThreadCategoryController.getCategory);
router.put('/:categoryId', isAuthenticated, validateThreadCategoryFields, ThreadCategoryController.updateCategory);

router.get('/:categoryId/threads', ThreadController.getCategoryThreads);

export default router;