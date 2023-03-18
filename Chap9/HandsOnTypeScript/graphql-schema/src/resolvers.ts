import { IResolvers } from '@graphql-tools/utils';
import * as uuid from 'uuid';

import { GqlContext, Todo, User, Subscriptions } from './types/index.js';
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
      { pubsub }: GqlContext,
      info: any,
    ): Promise<Todo> => {
      const newTodo: Todo = {
        id: uuid.v4(),
        title: args.title,
        description: args.description,
      };
      todos.push(newTodo);
      pubsub.publish(Subscriptions.NEW_TODO, { newTodo });
      return newTodo;
    },
  },
  Subscription: {
    newTodo: {
      subscribe: (
        parent: any,
        args: null,
        { pubsub }: GqlContext,
        info: any,
      ) => {
        return pubsub.asyncIterator(Subscriptions.NEW_TODO);
      },
    }
  }
};

export default resolvers;