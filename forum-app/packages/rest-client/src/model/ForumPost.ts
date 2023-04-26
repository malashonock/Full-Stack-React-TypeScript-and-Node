export interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  viewsCount: number;
  likesCount: number;
  createdOn: Date;
  body: string;
}
