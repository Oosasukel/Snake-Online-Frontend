import Button from 'components/Button';
import Input from 'components/Input';
import * as S from './styles';

const SignUp = () => {
  return (
    <S.Container>
      <S.Title>Sign up to Snake Online</S.Title>

      <S.Form>
        <Input placeholder="Nickname" style={{ marginBottom: '1rem' }} />
        <Input placeholder="Email" style={{ marginBottom: '1rem' }} />
        <Input
          type="password"
          placeholder="Password"
          style={{ marginBottom: '2rem' }}
        />

        <Button style={{ marginBottom: '2rem' }}>Sign Up</Button>

        <S.FooterText>
          Already have an account? <a>Sign in</a>
        </S.FooterText>
      </S.Form>
    </S.Container>
  );
};

export default SignUp;
