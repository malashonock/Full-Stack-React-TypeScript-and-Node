import { VoteType } from '.';

export interface ThreadCommentPointDto {
  id: string;
  userId: string;
  commentId: string;
  type: VoteType;
  createdOn: string; // date string
  lastModifiedOn: string; // date string
}
