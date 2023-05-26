import { RequestHandler } from 'express';

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .send('You need to log in first to perform this request');
  }

  next();
};

export const isAuthorized: RequestHandler = (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send('User id is not specified');
  }

  if (req.session.userId !== userId) {
    return res
      .status(403)
      .send('User is not authorized to perform this request');
  }

  next();
};
