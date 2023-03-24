import {
  UserProfileMenuItem,
  RegisterMenuItem,
  LoginMenuItem,
} from './menu-items';

import './Menu.scss';

export const Menu = () => {
  return (
    <ul className="menu__items">
      <UserProfileMenuItem />
      <RegisterMenuItem />
      <LoginMenuItem />
    </ul>
  );
};
