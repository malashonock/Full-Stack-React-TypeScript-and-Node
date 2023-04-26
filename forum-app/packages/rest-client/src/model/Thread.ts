import { Category, ForumPost, ThreadItem } from '.';

export interface Thread extends ForumPost {
  title: string;
  threadItems: ThreadItem[];
  category: Category;
  lastModifiedOn: Date;
}
