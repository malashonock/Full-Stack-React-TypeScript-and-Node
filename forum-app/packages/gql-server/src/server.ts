import http from 'http';
import { WebSocketServer } from 'ws';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';

import resolvers from './resolvers';
import { log } from './Logger';
import typeDefs from './typeDefs';
import { GqlContext } from './types';
import { applyMiddleware } from 'graphql-middleware';

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithMiddleware = applyMiddleware(schema, log);

export const pubsub = new PubSub();

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer(
  {
    schema: schemaWithMiddleware,
    context: async (): Promise<GqlContext> => ({ pubsub }),
  },
  wsServer,
);

const apolloServer = new ApolloServer({
  schema: schemaWithMiddleware,
  context: (): GqlContext => ({ pubsub }),
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

(async () => {
  await apolloServer.start();

  app.use(apolloServer.getMiddleware({ cors: false }));

  const port = process.env.PORT || 8000;
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(
    `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`,
  );
})();
