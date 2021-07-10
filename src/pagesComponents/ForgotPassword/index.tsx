import Button from 'components/Button';
import Input from 'components/Input';
import ModalConfirmation from 'components/ModalConfirmation';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import * as S from './styles';

const ForgotPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);

  const submit = useCallback(async () => {
    setLoading(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    setModalConfirmationOpen(true);
    setLoading(false);

    setTimeout(() => {
      router.push('/signin');
    }, 3000);
  }, [router]);

  return (
    <S.Container>
      <S.Form onSubmit={submit}>
        <S.Title>Forgot your password?</S.Title>
        <S.Subtitle>
          Enter your email address and we{"'"}ll send you a link to reset your
          password.
        </S.Subtitle>

        <Input placeholder="Email" />

        <S.ButtonsContainer>
          <Button disabled={loading} type="button" variant="secondary">
            Cancel
          </Button>
          <Button disabled={loading} loading={loading}>
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
