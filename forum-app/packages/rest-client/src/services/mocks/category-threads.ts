import { CategoryThread } from 'model';

export const mockCategory1TopThread1: CategoryThread = {
  category: 'Programming',
  id: '1',
  title: 'How can I learn JavaScript',
};

export const mockCategory1TopThread2: CategoryThread = {
  category: 'Programming',
  id: '2',
  title: 'How can I learn Node',
};

export const mockCategory1TopThread3: CategoryThread = {
  category: 'Programming',
  id: '3',
  title: 'How can I learn React',
};

export const mockCategory2TopThread1: CategoryThread = {
  category: 'Cooking',
  id: '4',
  title: '',
};

export const mockCategory2TopThread2: CategoryThread = {
  category: 'Cooking',
  id: '5',
  title: 'How do I learn French cuisine?',
};

export const mockCategory2TopThread3: CategoryThread = {
  category: 'Cooking',
  id: '6',
  title: 'How do I learn Italian cuisine?',
};

export const mockCategory3TopThread1: CategoryThread = {
  category: 'Sports',
  id: '7',
  title: 'How can I learn to play basketball',
};

export const mockCategory3TopThread2: CategoryThread = {
  category: 'Sports',
  id: '8',
  title: 'How can I learn to play baseball',
};

export const mockTopCategoryThreads: CategoryThread[] = [
  mockCategory1TopThread1,
  mockCategory1TopThread2,
  mockCategory1TopThread3,
  mockCategory2TopThread1,
  mockCategory2TopThread2,
  mockCategory2TopThread3,
  mockCategory3TopThread1,
  mockCategory3TopThread2,
];
