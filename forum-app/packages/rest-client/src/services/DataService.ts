import { Category, CategoryThread, Thread, ThreadItem } from 'model';
import {
  mockCategories,
  mockCategory1,
  mockCategory1Threads,
  mockThread1,
  mockTopCategoryThreads,
  mockUser2ThreadComments,
  mockUser2Threads,
} from './mocks';

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

export const getThreadById = async (id: string): Promise<Thread> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockThread1), 1_000);
  });
};

export const getUserThreads = async (userId: string): Promise<Thread[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUser2Threads), 1_000);
  });
};

export const getUserThreadComments = async (
  userId: string,
): Promise<ThreadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUser2ThreadComments), 1_000);
  });
};
