import { Modal, ModalProps } from 'common/components';
import { LoginForm } from '../LoginForm';

export const LoginModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <LoginForm />
    </Modal>
  );
};
