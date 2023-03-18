import * as uuid from 'uuid';
import { todos } from './db.js';
const resolvers = {
    Query: {
        getUser: async (parent, args, context, info) => {
            return Promise.resolve({
                id: uuid.v4(),
                username: 'Dave',
            });
        },
        getTodos: async (parent, args, context, info) => {
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
        addTodo: async (parent, args, context, info) => {
            todos.push({
                id: uuid.v4(),
                title: args.title,
                description: args.description,
            });
            return todos.at(-1);
        },
    },
};
export default resolvers;
