import React, { InputHTMLAttributes } from 'react';
import * as S from './styles';

// eslint-disable-next-line react/display-name
const Input = React.forwardRef(
  (
    props: InputHTMLAttributes<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return <S.CustomInput ref={ref} {...props} />;
  }
);

export default Input;
