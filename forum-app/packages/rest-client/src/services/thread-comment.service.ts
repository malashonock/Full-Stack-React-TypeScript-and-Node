import {
  ThreadCommentDto,
  ThreadCommentFields,
  ThreadCommentPointDto,
} from '@shared/types';

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
  const userComments = await FetchService.runQuery<ThreadCommentDto[]>(
    `/users/${userId}/comments`,
  );
  return userComments;
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

const upvoteComment = async (
  threadId: string,
  commentId: string,
): Promise<void> => {
  await FetchService.runMutation<{}, void>(
    `/threads/${threadId}/comments/${commentId}/upvote`,
    MutationMethod.POST,
    {},
  );
};

const downvoteComment = async (
  threadId: string,
  commentId: string,
): Promise<void> => {
  await FetchService.runMutation<{}, void>(
    `/threads/${threadId}/comments/${commentId}/downvote`,
    MutationMethod.POST,
    {},
  );
};

const getUserCommentVote = async (
  userId: string,
  commentId: string,
): Promise<ThreadCommentPointDto | null> => {
  try {
    const userCommentVote = await FetchService.runQuery<ThreadCommentPointDto>(
      `/users/${userId}/comments/${commentId}/vote`,
    );
    return userCommentVote;
  } catch (error) {
    return null;
  }
};

export const ThreadCommentService = {
  getThreadComments,
  getUserComments,
  getCommentById,
  createComment,
  updateComment,
  upvoteComment,
  downvoteComment,
  getUserCommentVote,
};
