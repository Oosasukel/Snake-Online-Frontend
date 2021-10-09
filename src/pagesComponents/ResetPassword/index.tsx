import Button from 'components/Button';
import Input from 'components/Input';
import { useApi } from 'hooks/useApi';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import * as yup from 'yup';
import * as S from './styles';

interface Data {
  password: string;
}

const ForgotPassword = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const { apieResetPassword } = useApi();

  const { requestId, requestSecret } = router.query;

  const handleSubmit = useCallback(
    async ({ password }: Data) => {
      setLoading(true);
      setError('');
      formRef.current.setErrors({});

      const schema = yup.object().shape({
        password: yup.string().required('Password is required.'),
      });

      try {
        await schema.validate(
          { password },
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
        await apieResetPassword({ requestId, requestSecret, password });
        setLoading(false);
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
    [apieResetPassword, requestId, requestSecret, router]
  );

  return (
    <S.Container>
      <S.Form ref={formRef} onSubmit={handleSubmit}>
        <S.Title>Reset your password</S.Title>
        <S.Subtitle>
          What would you like your new
          <br />
          password to be?
        </S.Subtitle>

        <Input
          name="password"
          placeholder="Password"
          style={{ marginBottom: '1rem' }}
        />

        {error && <S.Error>{error}</S.Error>}

        <Button disabled={loading} loading={loading}>
          Save
        </Button>
      </S.Form>
    </S.Container>
  );
};

export default ForgotPassword;
