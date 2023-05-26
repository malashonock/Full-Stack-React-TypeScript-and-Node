import { ThreadDto, ThreadFields, ThreadPointDto } from '@shared/types';

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

const upvoteThread = async (id: string): Promise<void> => {
  await FetchService.runMutation<{}, void>(
    `/threads/${id}/upvote`,
    MutationMethod.POST,
    {},
  );
};

const downvoteThread = async (id: string): Promise<void> => {
  await FetchService.runMutation<{}, void>(
    `/threads/${id}/downvote`,
    MutationMethod.POST,
    {},
  );
};

const getUserThreadVote = async (
  userId: string,
  threadId: string,
): Promise<ThreadPointDto | null> => {
  try {
    const userThreadVote = await FetchService.runQuery<ThreadPointDto>(
      `/users/${userId}/threads/${threadId}/vote`,
    );
    return userThreadVote;
  } catch (error) {
    return null;
  }
};

export const ThreadService = {
  getCategoryThreads,
  getUserThreads,
  getTopThreads,
  getThreadById,
  createThread,
  updateThread,
  upvoteThread,
  downvoteThread,
  getUserThreadVote,
};
