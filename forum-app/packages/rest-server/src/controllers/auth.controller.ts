import { NextFunction } from 'express';

import { AuthDto, LoginFields } from '@shared/types';

import UserRepo from '../repo/User.repo';
import PasswordService from '../services/password.service';
import { Request, Response } from '../types';

const login = async (req: Request<LoginFields>, res: Response<AuthDto>) => {
  try {
    const { name, password } = req.body;

    const user = await UserRepo.getUserByName(name);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isPasswordCorrect = await PasswordService.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return res.status(403).send('Password is invalid');
    }

    req.session.userId = user.id;

    // if (!user.isConfirmed) {
    //   return res
    //     .status(200)
    //     .send('User has not confirmed their registration email yet');
    // }

    const { id } = user;
    res.json({
      id,
      name,
    });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const checkLogin = async (req: Request<void>, res: Response<AuthDto>) => {
  try {
    const { userId } = req.session;
    if (!userId) {
      return res.status(401).send('Unauthenticated');
    }

    const user = await UserRepo.getUserById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const { id, name } = user;
    res.json({
      id,
      name,
    });
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const logout = async (
  req: Request<void>,
  res: Response<void>,
  next: NextFunction,
) => {
  try {
    req.session.destroy(() => next('route'));
    res.status(200).send('Logged out successfully');
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export default {
  login,
  checkLogin,
  logout,
};
