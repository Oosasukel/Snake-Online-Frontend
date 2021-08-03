import { Form } from '@unform/web';
import Background1 from 'components/Background1';
import Button from 'components/Button';
import Input from 'components/Input';
import SnakeAvatar from 'components/SnakeAvatar';
import Chat from 'pagesComponents/Game/components/Chat';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { useCallback, useContext, useState } from 'react';
import ModalNewRoom from './ModalNewRoom';
import * as S from './styles';

const Home = () => {
  const {
    joinRoom,
    user,
    rooms,
    playersOnline,
    createRoom,
    ping,
    signOut,
  } = useContext(GameContext);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const searchRoom = useCallback(() => {}, []);

  return (
    <S.Container>
      <Background1 />
      <ModalNewRoom
        open={modalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
        onCreate={(roomName) => createRoom(roomName)}
      />
      <S.Ping>Ping: {ping}ms</S.Ping>
      <S.ReturnIcon onClick={() => signOut()} src="/icons/return.svg" />

      <S.OnlineUsers>
        <S.UsersIcon src="/icons/users.svg" />
        <span>{playersOnline}</span>
      </S.OnlineUsers>

      <S.SectionPlayer>
        <S.PlayerInfo>
          <span>{user.nickname}</span>
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
            {rooms.map((room) => {
              const enabled =
                !room.playing && room.maxUsers > room.currentUsers;

              return (
                <S.ListItem
                  disabled={!enabled}
                  key={room.id}
                  onClick={enabled ? () => joinRoom(room.id) : undefined}
                >
                  <span>{room.name}</span>
                  <span>
                    {room.currentUsers}/{room.maxUsers}
                  </span>
                </S.ListItem>
              );
            })}
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
