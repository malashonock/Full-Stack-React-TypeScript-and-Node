import { Thread } from 'model';
import { mockCategory1 } from './categories';
import { mockThread1Items, mockThread2Items } from './thread-items';

export const mockThread1: Thread = {
  id: 'thr-1',
  category: mockCategory1,
  title: 'Thread 1',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  userId: 'usr-1',
  userName: 'Dave',
  createdOn: new Date(),
  lastModifiedOn: new Date(),
  viewsCount: 22,
  PointsSum: 11,
  threadItems: [...mockThread1Items],
};

export const mockThread2: Thread = {
  id: 'thr-2',
  category: mockCategory1,
  title: 'Thread 2',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  userId: 'usr-3',
  userName: 'Tim',
  createdOn: new Date(),
  lastModifiedOn: new Date(),
  viewsCount: 5,
  PointsSum: 55,
  threadItems: [...mockThread2Items],
};

export const mockThread3: Thread = {
  id: 'thr-3',
  category: mockCategory1,
  title: 'Thread 3',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  userId: 'usr-2',
  userName: 'Jon',
  createdOn: new Date(),
  lastModifiedOn: new Date(),
  viewsCount: 3,
  PointsSum: 33,
  threadItems: [],
};

export const mockCategory1Threads: Thread[] = [mockThread1, mockThread2];

export const mockUser2Threads: Thread[] = [mockThread3];
