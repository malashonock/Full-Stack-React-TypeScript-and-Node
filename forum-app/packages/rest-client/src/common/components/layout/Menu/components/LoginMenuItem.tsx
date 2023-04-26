import { useState } from 'react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from './MenuItem';
import { LoginForm } from 'features/auth';

export const LoginMenuItem = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const openLoginForm = () => setShowLoginForm(true);
  const closeLoginForm = () => setShowLoginForm(false);

  return (
    <>
      <MenuItem icon={faSignInAlt} name="menu-login" onClick={openLoginForm}>
        Log in
      </MenuItem>
      <LoginForm isOpen={showLoginForm} onClose={closeLoginForm} />
    </>
  );
};
