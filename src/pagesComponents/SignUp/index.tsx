import { FormHandles } from '@unform/core';
import Button from 'components/Button';
import Input from 'components/Input';
import { useApi } from 'hooks/useApi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import * as yup from 'yup';
import { string } from 'yup';
import * as S from './styles';

interface SignUpData {
  nickname: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>();
  const { apiSignUp } = useApi();

  const handleSubmit = useCallback(
    async ({ email, nickname, password }: SignUpData) => {
      setLoading(true);
      setError('');
      formRef.current.setErrors({});

      const schema = yup.object().shape({
        nickname: string().required('Nickname is required.'),
        email: yup
          .string()
          .email('Insert a valid email.')
          .required('Email is required.'),
        password: yup.string().required('Password is required.'),
      });

      try {
        await schema.validate(
          { nickname, email, password },
          { abortEarly: false }
        );
      } catch (error) {
        const validationErrors = {};

        if (error instanceof yup.ValidationError) {
          error.inner.forEach((currentError) => {
            validationErrors[currentError.path] = currentError.message;
          });
          formRef.current.setErrors(validationErrors);
        }

        setLoading(false);
        return;
      }

      try {
        await apiSignUp({ nickname, email, password });

        router.push('/signin');
      } catch (error) {
        if (error.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }

        setLoading(false);
      }
    },
    [apiSignUp, router]
  );

  return (
    <S.Container>
      <S.Title>Sign up to Snake Online</S.Title>

      <S.Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="nickname"
          placeholder="Nickname"
          style={{ marginBottom: '1rem' }}
        />
        <Input
          name="email"
          placeholder="Email"
          style={{ marginBottom: '1rem' }}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          style={{ marginBottom: '2rem' }}
        />

        {error && <S.Error>{error}</S.Error>}

        <Button
          disabled={loading}
          loading={loading}
          style={{ marginBottom: '2rem' }}
        >
          Sign Up
        </Button>

        <S.FooterText>
          Already have an account? <Link href="/signin">Sign in</Link>
        </S.FooterText>
      </S.Form>
    </S.Container>
  );
};

export default SignUp;
