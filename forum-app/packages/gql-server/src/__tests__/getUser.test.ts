import { graphql } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { faker } from '@faker-js/faker';

import typeDefs from '../typeDefs';
import resolvers from '../resolvers';

describe('getUser query', () => {
  const getUserQuery = `#graphql
    query GetUser($id: ID!) {
      getUser(id: $id) {
        id
        username
        email
      }
    }
  `;

  it('gets the desired user', async () => {
    const id = faker.random.alphaNumeric(20);
    const username = faker.internet.userName();
    const email = faker.internet.email();

    console.log('id', id);
    console.log('username', username);
    console.log('email', email);

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    const mocks = {
      User: () => ({
        id,
        username,
        email,
      }),
    };

    const schemaWithMocks = addMocksToSchema({
      schema,
      mocks,
    });

    const queryResponse = await graphql({
      schema: schemaWithMocks,
      source: getUserQuery,
      variableValues: {
        id: faker.random.alphaNumeric(20),
      },
    });

    const result = queryResponse.data?.getUser ?? null;
    console.log('result', result);

    expect(result).toEqual({
      id,
      username,
      email,
    });
  });
});
