import { RequestHandler } from 'express';

import UserRepo from '../repo/User.repo';
import PasswordService from '../services/password.service';

const login: RequestHandler = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await UserRepo.getUserByName(userName);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isPasswordCorrect = await PasswordService.comparePasswords(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send('Password is invalid');
    }

    req.session.userId = user.id;

    if (!user.isConfirmed) {
      return res.status(200).send('User has not confirmed their registration email yet');
    }

    const { id, email } = user;
    res.send({
      id,
      userName,
      email,
    });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const logout: RequestHandler = async (req, res, next) => {
  try {
    req.session.destroy(() => next('route'));
    res.status(200).send('Logged out successfully');
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export default {
  login,
  logout,
};