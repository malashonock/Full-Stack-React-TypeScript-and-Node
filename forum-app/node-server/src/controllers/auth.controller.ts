import { RequestHandler } from 'express';

import UserRepo from '../repo/User.repo';
import PasswordService from '../services/password.service';

const login: RequestHandler = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await UserRepo.findUserByName(userName);

    if (!user) {
      res.status(404).send('User not found');
    } else {
      const isPasswordCorrect = await PasswordService.comparePasswords(password, user.password);
      if (!isPasswordCorrect) {
        res.status(403).send('Password is invalid');
        return next('route');
      }
      
      if (!user.isConfirmed) {
        res.status(200).send('User has not confirmed their registration email yet');
        return next('route');
      }
      const { id, email } = user;
      res.send({
        id,
        userName,
        email,
      });
    }
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export default {
  login,
};