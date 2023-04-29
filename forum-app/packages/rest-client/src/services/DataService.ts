import { ThreadItem } from 'model';
import { mockUser2ThreadComments } from './mocks';

export const getUserThreadComments = async (
  userId: string,
): Promise<ThreadItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUser2ThreadComments), 1_000);
  });
};
