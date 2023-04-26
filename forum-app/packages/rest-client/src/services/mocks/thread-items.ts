import { ThreadItem } from 'model';

export const mockThreadItem1: ThreadItem = {
  id: 'ti-1',
  threadId: 'thr-1',
  userId: 'usr-2',
  userName: 'Jon',
  body: 'Thread item 1',
  createdOn: new Date(),
  viewsCount: 22,
  likesCount: 2,
};

export const mockThreadItem2: ThreadItem = {
  id: 'ti-2',
  threadId: 'thr-2',
  userId: 'usr-2',
  userName: 'Jon',
  body: 'Thread item 1',
  createdOn: new Date(),
  viewsCount: 55,
  likesCount: 5,
};

export const mockThread1Items: ThreadItem[] = [mockThreadItem1];

export const mockThread2Items: ThreadItem[] = [mockThreadItem2];

export const mockUser2ThreadComments: ThreadItem[] = [
  mockThreadItem1,
  mockThreadItem2,
];
