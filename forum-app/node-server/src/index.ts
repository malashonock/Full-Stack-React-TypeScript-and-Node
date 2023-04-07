import path from 'path';
import * as dotenv from 'dotenv';

// Read variables from .env
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});
console.log(process.env.NODE_ENV);

import express from 'express';
import { createServer } from 'http';
import sessionMiddleware from './middlewares/session';
import router from './routes/index';

// Setup Express server
const app = express();
const server = createServer(app);

// Set up middlewares
app.use(sessionMiddleware);

// Set up routes
app.use(router);

server.listen({ port: process.env.SERVER_PORT }, () => {
  console.log('Server is running!');
});
