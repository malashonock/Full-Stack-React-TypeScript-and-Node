import { Modal } from 'common/components';
import { Menu } from 'features/layout';

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
