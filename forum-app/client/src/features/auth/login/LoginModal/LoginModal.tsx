import ReactModal from 'react-modal';

import { ModalProps } from 'common/types';
import { LoginForm } from '../LoginForm';
import styles from './LoginModal.style';

export const LoginModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      appElement={document.querySelector('#root') as HTMLElement}
      style={styles}
    >
      <LoginForm />
    </ReactModal>
  );
};
