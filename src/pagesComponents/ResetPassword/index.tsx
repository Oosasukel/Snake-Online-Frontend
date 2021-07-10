import Button from 'components/Button';
import Input from 'components/Input';
import * as S from './styles';

const ForgotPassword = () => {
  return (
    <S.Container>
      <S.Form>
        <S.Title>Reset your password</S.Title>
        <S.Subtitle>
          What would you like your new
          <br />
          password to be?
        </S.Subtitle>

        <Input placeholder="Password" style={{ marginBottom: '1rem' }} />

        <Button>Save</Button>
      </S.Form>
    </S.Container>
  );
};

export default ForgotPassword;
