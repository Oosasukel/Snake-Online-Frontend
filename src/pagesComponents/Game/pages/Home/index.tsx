import { Form } from '@unform/web';
import Background1 from 'components/Background1';
import Button from 'components/Button';
import Input from 'components/Input';
import SnakeAvatar from 'components/SnakeAvatar';
import { useRouter } from 'next/router';
import Chat from 'pagesComponents/Game/components/Chat';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { removeStorage } from 'utils/storage';
import ModalNewRoom from './ModalNewRoom';
import * as S from './styles';

const Home = () => {
  const router = useRouter();
  const { connected, joinRoom } = useContext(GameContext);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  const signOut = useCallback(() => {
    removeStorage('access_token');
    removeStorage('refresh_token');
    removeStorage('user');
    router.push('/signin');
  }, [router]);

  useEffect(() => {
    if (connected) {
      joinRoom('home');
    }
  }, [connected, joinRoom, router]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const searchRoom = useCallback(() => {}, []);

  return (
    <S.Container>
      <Background1 />
      <ModalNewRoom
        open={modalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
        onCreate={(roomName) => console.log(roomName)}
      />
      <S.ReturnIcon onClick={signOut} src="/icons/return.svg" />

      <S.SectionPlayer>
        <S.PlayerInfo>
          <span>Nickname</span>
          <SnakeAvatar />
        </S.PlayerInfo>
        <Chat />
      </S.SectionPlayer>
      <S.SectionRooms>
        <S.RoomsContainer>
          <S.RoomsHeader>
            <span>Room Name</span>
            <span>Players</span>
          </S.RoomsHeader>
          <S.RoomsList>
            <S.ListItem onClick={() => joinRoom('sala 1')}>
              <span>Sala 1</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => joinRoom('sala 2')}>
              <span>Sala 2</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => joinRoom('sala 3')}>
              <span>Sala 3</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => joinRoom('sala 4')}>
              <span>Sala 4</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem disabled>
              <span>Sala 5</span>
              <span>8/8</span>
            </S.ListItem>
          </S.RoomsList>
        </S.RoomsContainer>
        <S.RoomsOptions>
          <Form onClick={searchRoom} onSubmit={searchRoom}>
            <Input name="hello" placeholder="Type to search rooms..." />
            <button type="submit">
              <S.SearchIcon src="/icons/search.svg" />
            </button>
          </Form>

          <Button onClick={() => setModalCreateOpen(true)}>New Room</Button>
        </S.RoomsOptions>
      </S.SectionRooms>
    </S.Container>
  );
};

export default Home;
