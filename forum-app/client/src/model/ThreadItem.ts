import { IForumPost } from '.';

export class ThreadItem implements IForumPost {
  constructor(
    public id: string,
    public viewsCount: number,
    public likesCount: number,
    public body: string,
    public userName: string,
    public userId: string,
    public createdOn: Date,
    public threadId: string,
  ) {}
}
