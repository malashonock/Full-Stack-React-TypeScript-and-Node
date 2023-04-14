import { RequestHandler } from 'express';

import UserRepo from '../repo/User.repo';

const registerUser: RequestHandler = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const createdUser = await UserRepo.createUser(userName, email, password);
    const { id } = createdUser;
    
    res.send({
      id,
      userName,
      email,
    });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export default {
  registerUser,
};