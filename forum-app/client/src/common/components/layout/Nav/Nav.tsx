import { useState } from 'react';

import { BurgerButton, MobileMenu } from '..';
import { forMobile } from 'common/hocs';

import './Nav.scss';

const BurgerButtonMobile = forMobile(BurgerButton);

export const Nav = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  const closeMobileMenu = () => setShowMobileMenu(false);

  return (
    <>
      <MobileMenu isOpen={showMobileMenu} onClose={closeMobileMenu} />
      <nav className="navigation">
        <BurgerButtonMobile onClick={toggleMobileMenu} />
        <strong>SuperForum</strong>
      </nav>
    </>
  );
};
