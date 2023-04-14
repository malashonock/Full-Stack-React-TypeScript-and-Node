import express from 'express';
import ThreadCategoryController from '../controllers/thread-category.controller';
import { isAuthenticated } from '../middleware/auth';
import { validateThreadCategoryFields } from '../middleware/validation/thread-category.validation';

const router = express.Router();

router.get('/', ThreadCategoryController.getAllCategories);
router.get('/top-threads', ThreadCategoryController.getTopCategoryThreads);
router.get('/:categoryId', ThreadCategoryController.getCategory);
router.get('/:categoryId/threads', ThreadCategoryController.getCategoryThreads);
router.post('/', isAuthenticated, validateThreadCategoryFields, ThreadCategoryController.createCategory);
router.put('/:categoryId', isAuthenticated, validateThreadCategoryFields, ThreadCategoryController.updateCategory);

export default router;