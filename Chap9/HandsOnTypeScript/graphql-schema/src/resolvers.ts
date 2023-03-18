import { IResolvers } from '@graphql-tools/utils';
import * as uuid from 'uuid';

import { GqlContext, Todo, User } from './types/index.js';
import { todos } from './db.js';

const resolvers: IResolvers = {
  Query: {
    getUser: async (
      parent: any,
      args: {
        id: string,
      },
      context: GqlContext,
      info: any,
    ): Promise<User> => {
      return Promise.resolve({
        id: uuid.v4(),
        username: 'Dave',
      });
    },
    getTodos: async (
      parent: any,
      args: null,
      context: GqlContext,
      info: any,
    ): Promise<Todo[]> => {
      return Promise.resolve([
        {
          id: uuid.v4(),
          title: 'First todo',
          description: 'First todo description',
        },
        {
          id: uuid.v4(),
          title: 'Second todo',
          description: 'Second todo description',
        },
        {
          id: uuid.v4(),
          title: 'Third todo',
        },
      ]);
    },
  },
  Mutation: {
    addTodo: async (
      parent: any,
      args: {
        title: string,
        description?: string,
      },
      context: GqlContext,
      info: any,
    ): Promise<Todo> => {
      todos.push({
        id: uuid.v4(),
        title: args.title,
        description: args.description,
      });
      return todos.at(-1)!;
    },
  },
};

export default resolvers;