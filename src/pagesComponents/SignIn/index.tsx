import Button from 'components/Button';
import Input from 'components/Input';
import * as S from './styles';

const SignIn = () => {
  return (
    <S.Container>
      <S.LogoContainer>
        <S.Light />
        <S.Logo src="/images/Logo.png" />
      </S.LogoContainer>

      <S.Form>
        <Input
          placeholder="Email or Nickname"
          style={{ marginBottom: '1rem' }}
        />
        <Input
          type="password"
          placeholder="Password"
          style={{ marginBottom: '0.25rem' }}
        />
        <S.ForgotPasswordText>Forgot password?</S.ForgotPasswordText>

        <Button style={{ marginBottom: '2rem' }}>Sign In</Button>

        <S.FooterText>
          Don{"'"}t have an account? <a>Create</a>
        </S.FooterText>
      </S.Form>
    </S.Container>
  );
};

export default SignIn;
