import { ButtonHTMLAttributes } from 'react';
import * as S from './styles';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button = ({
  children,
  variant = 'primary',
  ...rest
}: CustomButtonProps) => {
  return (
    <S.CustomButton {...rest} variant={variant}>
      {children}
    </S.CustomButton>
  );
};

export default Button;
