import { UserDto } from './UserDto';
import { ThreadCategoryDto } from './ThreadCategoryDto';

export interface ThreadDto {
  id: string;
  author: Pick<UserDto, 'id' | 'name'>;
  category: Pick<ThreadCategoryDto, 'id' | 'name'>;
  title: string;
  body: string;
  viewsCount: number;
  commentsCount: number;
  pointsSum: number;
  isDisabled: boolean;
  createdOn: string; // date string
  lastModifiedOn: string; // date string
}
