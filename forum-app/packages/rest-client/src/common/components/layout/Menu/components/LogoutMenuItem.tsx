import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from './MenuItem';
import { AuthService } from 'services';
import { useAppDispatch } from 'hooks';
import { logOut } from 'store/slices/auth.slice';

export const LogoutMenuItem = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async (): Promise<void> => {
    try {
      await AuthService.logout();
      dispatch(logOut());
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <>
      <MenuItem icon={faSignOutAlt} name="menu-login" onClick={handleLogout}>
        Log out
      </MenuItem>
    </>
  );
};
