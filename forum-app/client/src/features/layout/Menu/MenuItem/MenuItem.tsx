import { PropsWithChildren } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MenuItem.scss';

interface MenuItemProps {
  icon: IconProp;
  name: string;
  onClick?: () => void;
}

export const MenuItem = ({
  icon,
  name,
  onClick,
  children,
}: PropsWithChildren<MenuItemProps>) => {
  return (
    <li key={name} className="menu-item" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      <span className="menu-item-text">{children}</span>
    </li>
  );
};
