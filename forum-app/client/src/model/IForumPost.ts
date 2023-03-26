export interface IForumPost {
  id: string;
  userId: string;
  userName: string;
  viewsCount: number;
  likesCount: number;
  createdOn: Date;
  lastModifiedOn?: Date;
  title?: string;
  body: string;
}
