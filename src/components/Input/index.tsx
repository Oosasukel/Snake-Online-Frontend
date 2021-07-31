import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  helperText?: string;
}

// eslint-disable-next-line react/display-name
const Input = ({ name, helperText, style, ...rest }: InputProps) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField<HTMLInputElement>({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <S.Container style={style} error={!!error}>
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />
      {(error || helperText) && <span>{error || helperText}</span>}
    </S.Container>
  );
};

export default Input;
