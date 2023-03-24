import { useState } from 'react';
import { faRegistered } from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from '../MenuItem';
import { RegistrationForm } from 'features/auth';

export const RegisterMenuItem = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const openRegistrationForm = () => setShowRegistrationForm(true);
  const closeRegistrationForm = () => setShowRegistrationForm(false);

  return (
    <>
      <MenuItem
        icon={faRegistered}
        name="menu-register"
        onClick={openRegistrationForm}
      >
        Register
      </MenuItem>
      <RegistrationForm
        isOpen={showRegistrationForm}
        onClose={closeRegistrationForm}
      />
    </>
  );
};
