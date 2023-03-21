import { MobileMenu } from 'components/MobileMenu';
import { useWindowDimensions } from 'hooks';
import { useState } from 'react';
import { BurgerButton } from '../BurgerButton/BurgerButton';

import './Nav.scss';

export const Nav = () => {
  const { width } = useWindowDimensions();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  const closeMobileMenu = () => setShowMobileMenu(false);

  const mobileMenuButton =
    width <= 768 ? <BurgerButton onClick={toggleMobileMenu} /> : null;

  return (
    <>
      <MobileMenu isOpen={showMobileMenu} onClose={closeMobileMenu} />
      <nav className="navigation">
        {mobileMenuButton}
        <strong>SuperForum</strong>
      </nav>
    </>
  );
};
