import { PropsWithChildren, useContext } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MobileMenuContext } from 'common/components/layout/MobileMenu';

import './MenuItem.scss';

interface MenuItemProps {
  icon: IconProp;
  name: string;
  onClick?: () => void;
  closeModalOnClick?: boolean;
}

export const MenuItem = ({
  icon,
  name,
  onClick,
  closeModalOnClick = false,
  children,
}: PropsWithChildren<MenuItemProps>) => {
  const onMobileMenuClose = useContext(MobileMenuContext);

  const handleClick = (): void => {
    onClick?.call(null);
    closeModalOnClick && onMobileMenuClose?.call(null);
  };

  return (
    <li key={name} className="menu__item" onClick={handleClick}>
      <FontAwesomeIcon icon={icon} />
      <span className="menu-item-text">{children}</span>
    </li>
  );
};
