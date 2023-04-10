import { RequestHandler } from 'express';

const get: RequestHandler = (req, res) => {
  req.session.userId = req.query.userId as string;
  console.log('User id is set');
  req.session.loadedCount = (req.session.loadedCount ?? 0) + 1;
  res.send(`userId: ${req.session.userId}, loadedCount: ${req.session.loadedCount}`);
};

export default {
  get,
};