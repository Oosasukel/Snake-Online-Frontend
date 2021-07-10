import * as S from './styles';

interface ModalConfirmationProps {
  open: boolean;
  title: string;
  subtitle?: string;
}

const ModalConfirmation = ({
  open,
  title,
  subtitle,
}: ModalConfirmationProps) => {
  return (
    <S.Container open={open}>
      <S.Title>{title}</S.Title>

      {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
    </S.Container>
  );
};

export default ModalConfirmation;
