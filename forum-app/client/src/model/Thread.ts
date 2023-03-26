import { Category, IForumPost, ThreadItem } from '.';

export class Thread implements IForumPost {
  constructor(
    public id: string,
    public title: string,
    public body: string,
    public userName: string,
    public userId: string,
    public viewsCount: number,
    public likesCount: number,
    public createdOn: Date,
    public lastModifiedOn: Date,
    public threadItems: Array<ThreadItem>,
    public category: Category,
  ) {}
}
