import { VoteType } from '.';

export interface ThreadPointDto {
  id: string;
  userId: string;
  threadId: string;
  type: VoteType;
  createdOn: string; // date string
  lastModifiedOn: string; // date string
}
