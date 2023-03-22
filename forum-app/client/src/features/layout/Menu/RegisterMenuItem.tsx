import { faRegistered } from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from './MenuItem';

export const RegisterMenuItem = () => {
  return (
    <MenuItem icon={faRegistered} key="menu-register">
      Register
    </MenuItem>
  );
};
