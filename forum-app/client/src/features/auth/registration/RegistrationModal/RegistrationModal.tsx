import { Modal, ModalProps } from 'common/components';
import { RegistrationForm } from '../RegistrationForm';

export const RegistrationModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <RegistrationForm />
    </Modal>
  );
};
