import { UserDto } from './UserDto';

export interface ThreadCommentDto {
  id: string;
  threadId: string;
  author: Pick<UserDto, 'id' | 'name'>;
  body: string;
  viewsCount: number;
  pointsSum: number;
  isDisabled: boolean;
  createdOn: string; // date string
  lastModifiedOn: string; // date string
}
