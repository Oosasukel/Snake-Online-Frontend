import { InputHTMLAttributes } from 'react';
import * as S from './styles';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <S.CustomInput {...props} />;
};

export default Input;
