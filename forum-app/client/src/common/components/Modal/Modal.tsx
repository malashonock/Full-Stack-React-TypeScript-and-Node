import { PropsWithChildren } from 'react';
import ReactModal from 'react-modal';

import styles from './Modal.style';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      appElement={document.querySelector('#root') as HTMLElement}
      style={styles}
    >
      {children}
    </ReactModal>
  );
};
