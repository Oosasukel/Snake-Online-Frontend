import Background1 from 'components/Background1';
import Button from 'components/Button';
import Chat from 'components/Chat';
import { useRouter } from 'next/router';
import Player from './Player';
import * as S from './styles';

const Room = () => {
  const router = useRouter();

  return (
    <S.Container>
      <Background1 />

      <S.SectionChat>
        <S.TitleContainer>
          <S.ReturnIcon
            onClick={() => router.push('/')}
            src="/icons/return.svg"
          />
          <h1>Sala do Rodrigo</h1>
        </S.TitleContainer>

        <Chat />
      </S.SectionChat>

      <S.SectionRoom>
        <S.PlayersContainer>
          <Player owner />
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
          <Player />
        </S.PlayersContainer>
        <S.ConfigContainer>
          <Button>READY</Button>
        </S.ConfigContainer>
      </S.SectionRoom>
    </S.Container>
  );
};

export default Room;
