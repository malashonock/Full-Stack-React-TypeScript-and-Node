import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from 'hooks';
import { selectLoggedUser } from 'store/slices/auth.slice';
import { MenuItem } from './MenuItem';

export const UserProfileMenuItem = () => {
  const loggedUser = useAppSelector(selectLoggedUser);

  return (
    <MenuItem icon={faUser} name="menu-user-profile" closeModalOnClick>
      <Link to={`/userprofile/${loggedUser?.id}`}>{loggedUser?.name}</Link>
    </MenuItem>
  );
};
