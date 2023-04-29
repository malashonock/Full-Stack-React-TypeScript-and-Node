import { ThreadDto, ThreadFields } from '@shared/types';

import { FetchService, MutationMethod } from 'common/utils';

const getCategoryThreads = async (categoryId: string): Promise<ThreadDto[]> => {
  const categoryThreads = await FetchService.runQuery<ThreadDto[]>(
    `/categories/${categoryId}/threads`,
  );
  return categoryThreads;
};

const getTopThreads = async (topN?: number): Promise<ThreadDto[]> => {
  const searchParams = new URLSearchParams({ topN: String(topN) });
  const queryString: string = searchParams ? `?${searchParams.toString()}` : '';

  const topThreads = await FetchService.runQuery<ThreadDto[]>(
    `/categories/top-threads${queryString}`,
  );
  return topThreads;
};

const getUserThreads = async (userId: string): Promise<ThreadDto[]> => {
  const userThreads = await FetchService.runQuery<ThreadDto[]>(
    `/users/${userId}/threads`,
  );
  return userThreads;
};

const getThreadById = async (id: string): Promise<ThreadDto> => {
  const thread = await FetchService.runQuery<ThreadDto>(`/threads/${id}`);
  return thread;
};

const createThread = async (threadData: ThreadFields): Promise<ThreadDto> => {
  const createdThread = await FetchService.runMutation<ThreadFields, ThreadDto>(
    '/threads',
    MutationMethod.POST,
    threadData,
  );
  return createdThread;
};

const updateThread = async (
  id: string,
  threadData: Partial<ThreadFields>,
): Promise<ThreadDto> => {
  const updatedThread = await FetchService.runMutation<
    Partial<ThreadFields>,
    ThreadDto
  >(`/threads/${id}`, MutationMethod.PUT, threadData);
  return updatedThread;
};

export const ThreadService = {
  getCategoryThreads,
  getUserThreads,
  getTopThreads,
  getThreadById,
  createThread,
  updateThread,
};
