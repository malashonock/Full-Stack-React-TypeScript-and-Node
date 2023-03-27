import { Category, CategoryThread, Thread } from 'model';
import {
  mockCategories,
  mockCategory1,
  mockCategory1Threads,
  mockTopCategoryThreads,
} from './mocks';

export const getCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategories), 1_000);
  });
};

export const getCategoryById = async (id: string): Promise<Category> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategory1), 1_000);
  });
};

export const getThreadsByCategoryId = async (
  categoryId: string,
): Promise<Thread[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCategory1Threads), 1_000);
  });
};

export const getTopCategories = async (): Promise<CategoryThread[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTopCategoryThreads), 1_000);
  });
};
