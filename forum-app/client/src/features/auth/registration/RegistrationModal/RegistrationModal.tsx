import ReactModal from 'react-modal';

import { ModalProps } from 'common/types';
import { RegistrationForm } from '../RegistrationForm';
import styles from './RegistrationModal.style';

export const RegistrationModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      appElement={document.querySelector('#root') as HTMLElement}
      style={styles}
    >
      <RegistrationForm />
    </ReactModal>
  );
};
