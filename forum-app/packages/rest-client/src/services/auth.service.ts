import { AuthDto, LoginFields } from '@shared/types';

import { FetchService, MutationMethod } from 'common/utils';

const login = async (userName: string, password: string): Promise<AuthDto> => {
  const authData = await FetchService.runMutation<LoginFields, AuthDto>(
    '/auth/login',
    MutationMethod.POST,
    { userName, password },
  );
  return authData;
};

const checkLogin = async (): Promise<AuthDto> => {
  const authData = await FetchService.runQuery<AuthDto>('/auth/login');
  return authData;
};

const logout = async (): Promise<void> => {
  await FetchService.runMutation<{}, void>(
    '/auth/logout',
    MutationMethod.POST,
    {},
  );
};

export const AuthService = {
  login,
  checkLogin,
  logout,
};
