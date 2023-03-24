import ReactModal from 'react-modal';

import { RegistrationForm } from '../RegistrationForm';
import styles from './RegistrationModal.style';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal = ({
  isOpen,
  onClose,
}: RegistrationModalProps) => {
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
