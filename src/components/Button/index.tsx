import { ButtonHTMLAttributes } from 'react';
import ButtonLoading from './ButtonLoading';
import * as S from './styles';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  loading = false,
  ...rest
}: CustomButtonProps) => {
  return (
    <S.CustomButton {...rest} variant={variant}>
      {loading ? <ButtonLoading /> : children}
    </S.CustomButton>
  );
};

export default Button;
