import * as S from './styles';

interface SnakeAvatarProps {
  empty?: boolean;
}

const SnakeAvatar = ({ empty = false }: SnakeAvatarProps) => {
  return (
    <S.Container>
      {empty ? (
        <>
          <S.EmptyBlock>
            <img
              src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              height="100%"
            />
          </S.EmptyBlock>
          <S.EmptyBlock>
            <img
              src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              height="100%"
            />
          </S.EmptyBlock>
          <S.EmptyBlock>
            <img
              src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              height="100%"
            />
          </S.EmptyBlock>
        </>
      ) : (
        <>
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
        </>
      )}
    </S.Container>
  );
};

export default SnakeAvatar;
