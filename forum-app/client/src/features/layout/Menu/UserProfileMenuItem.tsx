import { useEffect } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from 'hooks';
import { logIn, selectLoggedUser } from 'store/slices/authSlice';
import { MenuItem } from './MenuItem';

export const UserProfileMenuItem = () => {
  const loggedUser = useAppSelector(selectLoggedUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      logIn({
        id: 'usr-aaa',
        name: 'John Doe',
      }),
    );
  }, [dispatch, logIn]);

  return (
    <MenuItem icon={faUser} name="menu-user-profile">
      {loggedUser?.name}
    </MenuItem>
  );
};
