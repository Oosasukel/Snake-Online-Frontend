import Button from 'components/Button';
import Input from 'components/Input';
import ModalConfirmation from 'components/ModalConfirmation';
import { useApi } from 'hooks/useApi';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState } from 'react';
import * as yup from 'yup';
import * as S from './styles';

interface Data {
  email: string;
}

const ForgotPassword = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);
  const { apiRequestPassword } = useApi();

  const handleSubmit = useCallback(
    async ({ email }: Data) => {
      setLoading(true);
      setError('');
      formRef.current.setErrors({});

      const schema = yup.object().shape({
        email: yup
          .string()
          .email('Invalid email.')
          .required('Email is required.'),
      });

      try {
        await schema.validate({ email }, { abortEarly: false });
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
        await apiRequestPassword({ email });
        setModalConfirmationOpen(true);
        setLoading(false);
        setTimeout(() => router.push('/signin'), 3000);
      } catch (error) {
        if (error.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }

        setLoading(false);
      }
    },
    [apiRequestPassword, router]
  );

  return (
    <S.Container>
      <S.Form ref={formRef} onSubmit={handleSubmit}>
        <S.Title>Forgot your password?</S.Title>
        <S.Subtitle>
          Enter your email address and we{"'"}ll send you a link to reset your
          password.
        </S.Subtitle>

        <Input name="email" placeholder="Email" />

        {error && <S.Error>{error}</S.Error>}

        <S.ButtonsContainer>
          <Button
            onClick={() => router.push('/signin')}
            disabled={loading}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button disabled={loading} loading={loading} type="submit">
            Reset
          </Button>
        </S.ButtonsContainer>
      </S.Form>

      <ModalConfirmation
        open={modalConfirmationOpen}
        title="Check in your email!"
        subtitle="We send you an email with the link to reset your password."
      />
    </S.Container>
  );
};

export default ForgotPassword;
