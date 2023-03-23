import ReactModal from 'react-modal';

import { RegistrationForm } from './RegistrationForm';

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
    >
      <RegistrationForm />
    </ReactModal>
  );
};
