import { Modal } from 'common/components/Modal';
import { Menu } from '..';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Menu />
    </Modal>
  );
};
