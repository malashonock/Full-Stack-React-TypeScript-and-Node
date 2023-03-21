import { PropsWithChildren } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './MenuItem.scss';

interface MenuItemProps {
  icon: IconProp;
  key: string;
}

export const MenuItem = ({
  icon,
  key,
  children,
}: PropsWithChildren<MenuItemProps>) => {
  return (
    <li key={key} className="menu-item">
      <FontAwesomeIcon icon={icon} />
      <span className="menu-item-text">{children}</span>
    </li>
  );
};
