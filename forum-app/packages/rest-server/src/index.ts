import path from 'path';
import * as dotenv from 'dotenv';

// Read variables from .env
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});
console.log(process.env.NODE_ENV);

import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';

import corsMiddleware from './middleware/cors';
import sessionMiddleware from './middleware/session';
import dataSource from './persistence/dataSource';
import indexRouter from './routes/index.route';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import threadCategoryRouter from './routes/thread-category.route';
import threadRouter from './routes/thread.route';

(async () => {
  // Establish connection with the database
  try {
    await dataSource.initialize();
    console.log('Data source has been initialized');
  } catch (error) {
    console.error('Error during data source initialization:', error);
  }

  // Setup Express server
  const app = express();
  const server = createServer(app);

  // Set up middlewares
  app.use(corsMiddleware);
  app.use(sessionMiddleware);
  app.use(bodyParser.json());

  // Set up routes
  app.use('/', indexRouter);
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/categories', threadCategoryRouter);
  app.use('/threads', threadRouter);

  server.listen({ port: process.env.SERVER_PORT }, () => {
    console.log('Server is running!');
  });
})();
