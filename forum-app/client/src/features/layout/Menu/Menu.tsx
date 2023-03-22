import { RegisterMenuItem } from './RegisterMenuItem';
import { UserProfileMenuItem } from './UserProfileMenuItem';

export const Menu = () => {
  return (
    <ul className="menu-items">
      <UserProfileMenuItem />
      <RegisterMenuItem />
    </ul>
  );
};
