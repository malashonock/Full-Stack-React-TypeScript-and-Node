import { RequestHandler } from 'express';

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).send('You need to log in first to perform this request');
  } else {
    next();
  }
};
