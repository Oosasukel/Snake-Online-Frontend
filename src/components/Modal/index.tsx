import { ReactNode } from 'react';
import * as S from './styles';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Container onClick={(event) => event.stopPropagation()}>
        {children}
      </S.Container>
    </S.Overlay>
  );
};

export default Modal;
