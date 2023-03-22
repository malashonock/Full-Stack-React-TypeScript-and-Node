import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './BurgerButton.scss';

interface BurgerButtonProps {
  onClick: () => void;
}

export const BurgerButton = ({ onClick }: BurgerButtonProps) => {
  return (
    <FontAwesomeIcon
      icon={faBars}
      size="lg"
      className="nav-mobile-menu"
      onClick={onClick}
    />
  );
};
