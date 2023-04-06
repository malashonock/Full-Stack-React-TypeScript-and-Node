import { Modal } from 'common/components/Modal';
import { MobileMenuContext } from '.';
import { Menu } from '..';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <MobileMenuContext.Provider value={onClose}>
        <Menu />
      </MobileMenuContext.Provider>
    </Modal>
  );
};
