import * as uuid from 'uuid';

import { Todo } from './types/index.js';

export const todos: Todo[] = [
  {
    id: uuid.v4(),
    title: '1st todo',
    description: '1st todo description',
  },
  {
    id: uuid.v4(),
    title: '2nd todo',
    description: '2nd todo description',
  },
];