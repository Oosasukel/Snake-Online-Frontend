import { Form } from '@unform/web';
import Background1 from 'components/Background1';
import Button from 'components/Button';
import Input from 'components/Input';
import SnakeAvatar from 'components/SnakeAvatar';
import { useRouter } from 'next/router';
import Chat from 'pagesComponents/Game/components/Chat';
import { useCallback, useState } from 'react';
import ModalNewRoom from './ModalNewRoom';
import * as S from './styles';

const Home = () => {
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const router = useRouter();

  const searchRoom = useCallback(() => {}, []);

  return (
    <S.Container>
      <Background1 />
      <ModalNewRoom
        open={modalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
        onCreate={() => router.push('/room')}
      />
      <S.ReturnIcon
        onClick={() => router.push('/signin')}
        src="/icons/return.svg"
      />

      <S.SectionPlayer>
        <S.PlayerInfo>
          <span>Oosasukel</span>
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
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>
                Sala do Rodrigo Sala do Rodrigo Sala do Rodrigo Sala do Rodrigo
                Sala do Rodrigo Sala do Rodrigo
              </span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem disabled>
              <span>Sala do Rodrigo</span>
              <span>8/8</span>
            </S.ListItem>
            <S.ListItem disabled>
              <span>Sala do Rodrigo</span>
              <span>8/8</span>
            </S.ListItem>
            <S.ListItem disabled>
              <span>Sala do Rodrigo</span>
              <span>8/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
            <S.ListItem onClick={() => router.push('/room')}>
              <span>Sala do Rodrigo</span>
              <span>6/8</span>
            </S.ListItem>
          </S.RoomsList>
        </S.RoomsContainer>
        <S.RoomsOptions>
          <Form onSubmit={searchRoom}>
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
