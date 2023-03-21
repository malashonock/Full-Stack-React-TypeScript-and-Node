import { Menu } from 'components/Menu';
import ReactModal from 'react-modal';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
    >
      <Menu />
    </ReactModal>
  );
};
