import { useAppSelector } from 'hooks';
import { selectLoggedUser } from 'store/slices/auth.slice';
import {
  UserProfileMenuItem,
  RegisterMenuItem,
  LoginMenuItem,
  LogoutMenuItem,
} from './components';

import './Menu.scss';

export const Menu = () => {
  const loggedUser = useAppSelector(selectLoggedUser);

  return (
    <ul className="menu__items">
      {loggedUser ? (
        <>
          <UserProfileMenuItem />
          <LogoutMenuItem />
        </>
      ) : (
        <>
          <LoginMenuItem />
          <RegisterMenuItem />
        </>
      )}
    </ul>
  );
};
