import Button from 'components/Button';
import Input from 'components/Input';
import * as S from './styles';

const ForgotPassword = () => {
  return (
    <S.Container>
      <S.Form>
        <S.Title>Forgot your password?</S.Title>
        <S.Subtitle>
          Enter your email address and we{"'"}ll send you a link to reset your
          password.
        </S.Subtitle>

        <Input placeholder="Email" />

        <S.ButtonsContainer>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button>Reset</Button>
        </S.ButtonsContainer>
      </S.Form>
    </S.Container>
  );
};

export default ForgotPassword;
