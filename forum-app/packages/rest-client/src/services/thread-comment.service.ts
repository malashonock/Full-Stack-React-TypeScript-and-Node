import { ThreadCommentDto, ThreadCommentFields } from '@shared/types';

import { FetchService, MutationMethod } from 'common/utils';

const getThreadComments = async (
  threadId: string,
): Promise<ThreadCommentDto[]> => {
  const threadComments = await FetchService.runQuery<ThreadCommentDto[]>(
    `/threads/${threadId}/comments`,
  );
  return threadComments;
};

const getUserComments = async (userId: string): Promise<ThreadCommentDto[]> => {
  const userThreads = await FetchService.runQuery<ThreadCommentDto[]>(
    `/users/${userId}/comments`,
  );
  return userThreads;
};

const getCommentById = async (
  threadId: string,
  commentId: string,
): Promise<ThreadCommentDto> => {
  const comment = await FetchService.runQuery<ThreadCommentDto>(
    `/threads/${threadId}/comments/${commentId}`,
  );
  return comment;
};

const createComment = async (
  threadId: string,
  threadData: ThreadCommentFields,
): Promise<ThreadCommentDto> => {
  const createdComment = await FetchService.runMutation<
    ThreadCommentFields,
    ThreadCommentDto
  >(`/threads/${threadId}/comments`, MutationMethod.POST, threadData);
  return createdComment;
};

const updateComment = async (
  threadId: string,
  commentId: string,
  threadData: Partial<ThreadCommentFields>,
): Promise<ThreadCommentDto> => {
  const updatedComment = await FetchService.runMutation<
    Partial<ThreadCommentFields>,
    ThreadCommentDto
  >(
    `/threads/${threadId}/comments/${commentId}`,
    MutationMethod.PUT,
    threadData,
  );
  return updatedComment;
};

export const ThreadCommentService = {
  getThreadComments,
  getUserComments,
  getCommentById,
  createComment,
  updateComment,
};
