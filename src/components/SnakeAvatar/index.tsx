import * as S from './styles';

const SnakeAvatar = () => {
  return (
    <S.Container>
      <S.Tail>
        <img
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          height="100%"
        />
      </S.Tail>
      <S.Tail>
        <img
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          height="100%"
        />
      </S.Tail>
      <S.Head>
        <img
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          height="100%"
        />
      </S.Head>
    </S.Container>
  );
};

export default SnakeAvatar;
