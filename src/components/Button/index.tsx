import { ButtonHTMLAttributes } from 'react';
import ButtonLoading from './ButtonLoading';
import * as S from './styles';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  size?: 'normal' | 'large';
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  loading = false,
  size = 'normal',
  fullWidth = true,
  ...rest
}: CustomButtonProps) => {
  return (
    <S.CustomButton
      {...rest}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
    >
      {loading ? <ButtonLoading /> : children}
    </S.CustomButton>
  );
};

export default Button;
