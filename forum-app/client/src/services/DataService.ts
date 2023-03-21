import { Category } from 'model';

export const getCategories = async (): Promise<Category[]> => {
  const categories = [
    { id: 'cat-aaa', title: 'Programming' },
    { id: 'cat-bbb', title: 'Cooking' },
    { id: 'cat-ccc', title: 'Sports' },
    { id: 'cat-ddd', title: 'Entertainmenmt' },
    { id: 'cat-eee', title: 'Travel' },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), 2_000);
  });
};
