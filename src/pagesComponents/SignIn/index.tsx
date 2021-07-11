import Button from 'components/Button';
import Input from 'components/Input';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as S from './styles';

const SignIn = () => {
  const router = useRouter();

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
        <Link href="/forgot-password">
          <S.ForgotPasswordText>Forgot password?</S.ForgotPasswordText>
        </Link>

        <Button
          onClick={() => router.push('/')}
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
