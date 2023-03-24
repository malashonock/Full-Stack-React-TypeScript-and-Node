import { useState } from 'react';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from '../MenuItem';
import { LoginModal } from 'features/auth';

export const LoginMenuItem = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  return (
    <>
      <MenuItem icon={faSignInAlt} name="menu-login" onClick={openLoginModal}>
        Log in
      </MenuItem>
      <LoginModal isOpen={showLoginModal} onClose={closeLoginModal} />
    </>
  );
};
