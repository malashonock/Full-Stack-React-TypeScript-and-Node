import { useEffect } from 'react';

import { AuthDto } from '@shared/types';

import { useAppDispatch } from './useStore';
import { AuthService } from 'services';
import { logIn, logOut } from 'store/slices/auth.slice';

export const useSyncLogin = (dependencies?: any): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const userData: AuthDto = await AuthService.checkLogin();
        dispatch(logIn(userData));
      } catch (error) {
        dispatch(logOut());
      }
    })();
  }, [dependencies]);
};
