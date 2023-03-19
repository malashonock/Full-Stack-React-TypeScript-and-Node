import express from 'express';
import { createServer } from 'http';

const app = express();

const server = createServer(app);

server.listen({ port: 8000 }, () => {
  console.log('Server is running!');
});
