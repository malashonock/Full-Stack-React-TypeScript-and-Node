import { useState } from 'react';
import { faRegistered } from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from '../MenuItem';
import { RegistrationModal } from 'features/auth';

export const RegisterMenuItem = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const openRegisterModal = () => setShowRegistrationModal(true);
  const closeRegisterModal = () => setShowRegistrationModal(false);

  return (
    <>
      <MenuItem
        icon={faRegistered}
        name="menu-register"
        onClick={openRegisterModal}
      >
        Register
      </MenuItem>
      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={closeRegisterModal}
      />
    </>
  );
};
