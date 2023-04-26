import { RequestHandler } from 'express';

import UserRepository from '../repo/User.repo';

const registerUser: RequestHandler = async (req, res) => {
  try {
    const createdUser = await UserRepository.createUser(req.body);
    const { password, ...publicUserFields } = createdUser;
    res.json({ ...publicUserFields });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const updateUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const { userName, email, password } = req.body;

    if (!userName && !email && !password) {
      return res
        .status(304)
        .send('No updatable fields were provided in the request');
    }

    const updatedUser = await UserRepository.updateUser(userId, req.body);

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    const { password: _, ...publicUserFields } = updatedUser;
    res.json({ ...publicUserFields });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export default {
  registerUser,
  updateUser,
};
