import { useState } from 'react';
import { faRegistered } from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from './MenuItem';
import { RegistrationModal } from 'features/auth';

export const RegisterMenuItem = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const openregisterFieldModal = () => setShowRegistrationModal(true);
  const closeregisterFieldModal = () => setShowRegistrationModal(false);

  return (
    <>
      <MenuItem
        icon={faRegistered}
        name="menu-registerField"
        onClick={openregisterFieldModal}
      >
        Register
      </MenuItem>
      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={closeregisterFieldModal}
      />
    </>
  );
};
