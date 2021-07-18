import { FormHandles } from '@unform/core';
import Button from 'components/Button';
import Input from 'components/Input';
import { useApi } from 'hooks/useApi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import { setStorage } from 'utils/storage';
import * as yup from 'yup';
import * as S from './styles';

interface SignInFormData {
  login: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const formRef = useRef<FormHandles>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { apiLogin } = useApi();

  const handleSubmit = useCallback(
    async ({ login, password }: SignInFormData) => {
      setLoading(true);
      setError('');
      formRef.current.setErrors({});

      const schema = yup.object().shape({
        login: yup.string().required('Nickname/Email is required.'),
        password: yup.string().required('Password is required.'),
      });

      try {
        await schema.validate(
          { login, password },
          {
            abortEarly: false,
          }
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
        const { data } = await apiLogin({ login, password });
        const { access_token, refresh_token, user } = data;

        setStorage('access_token', access_token);
        setStorage('refresh_token', refresh_token);
        setStorage('user', user);

        router.push('/');
      } catch (error) {
        if (error.response.status === 401) {
          setError('Nickname/Email or password are incorrect.');
        } else {
          setError('Something went wrong. Try again later.');
        }

        setLoading(false);
      }
    },
    [apiLogin, router]
  );

  return (
    <S.Container>
      <S.LogoContainer>
        <S.Light />
        <S.Logo src="/images/Logo.png" />
      </S.LogoContainer>

      <S.Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="login"
          placeholder="Nickname or Email"
          style={{ marginBottom: '1rem' }}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          style={{ marginBottom: '0.25rem' }}
        />
        <Link href="/forgot-password">
          <S.ForgotPasswordText>Forgot password?</S.ForgotPasswordText>
        </Link>

        {error && <S.Error>{error}</S.Error>}

        <Button
          disabled={loading}
          loading={loading}
          style={{ marginBottom: '2rem' }}
        >
          Sign In
        </Button>

        <S.FooterText>
          Don{"'"}t have an account? <Link href="/signup">Create</Link>
        </S.FooterText>
      </S.Form>
    </S.Container>
  );
};

export default SignIn;
