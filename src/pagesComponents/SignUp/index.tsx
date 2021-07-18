import Button from 'components/Button';
import Input from 'components/Input';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as S from './styles';

const SignUp = () => {
  const router = useRouter();

  return (
    <S.Container>
      <S.Title>Sign up to Snake Online</S.Title>

      <S.Form onSubmit={(data) => console.log(data)}>
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

        <Button
          onClick={() => router.push('/')}
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
