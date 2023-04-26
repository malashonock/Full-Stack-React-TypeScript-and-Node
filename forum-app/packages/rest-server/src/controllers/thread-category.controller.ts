import { RequestHandler } from 'express';

import ThreadCategoryRepository from '../repo/ThreadCategory.repo';

const getAllCategories: RequestHandler = async (req, res) => {
  try {
    const categories = await ThreadCategoryRepository.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const getCategory: RequestHandler = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.send(404).send('Thread category not found');
    }

    const category = await ThreadCategoryRepository.getCategoryById(categoryId);
    res.json(category);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const createCategory: RequestHandler = async (req, res) => {
  try {
    const createdCategory = await ThreadCategoryRepository.createCategory(
      req.body,
    );
    res.json(createdCategory);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const updateCategory: RequestHandler = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(404).send('Thread category not found');
    }

    const { name, description } = req.body;

    if (!name && !description) {
      return res
        .status(304)
        .send('No updatable fields were provided in the request');
    }

    const updatedCategory = await ThreadCategoryRepository.updateCategory(
      categoryId,
      req.body,
    );

    if (!updatedCategory) {
      return res.status(404).send('Thread category not found');
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export default {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
};
