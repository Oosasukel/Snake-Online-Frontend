import { ReactNode } from 'react';
import * as S from './styles';

interface ModalGameOverProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalGameOver = ({ open, onClose, children }: ModalGameOverProps) => {
  if (!open) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Container onClick={(event) => event.stopPropagation()}>
        {children}
      </S.Container>
    </S.Overlay>
  );
};

export default ModalGameOver;
