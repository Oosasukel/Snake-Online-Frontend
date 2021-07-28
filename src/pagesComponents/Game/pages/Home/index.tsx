import { Form } from '@unform/web';
import Background1 from 'components/Background1';
import Button from 'components/Button';
import Input from 'components/Input';
import SnakeAvatar from 'components/SnakeAvatar';
import { useRouter } from 'next/router';
import Chat from 'pagesComponents/Game/components/Chat';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { Room } from 'pagesComponents/Game/context/types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { signOut } from 'utils/signOut';
import ModalNewRoom from './ModalNewRoom';
import * as S from './styles';

const Home = () => {
  const router = useRouter();
  const { joinRoom, user, subscribeUpdateRooms, createRoom } = useContext(
    GameContext
  );
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    subscribeUpdateRooms((rooms) => {
      setRooms(rooms);
    });
  }, [subscribeUpdateRooms]);

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
      <S.ReturnIcon onClick={() => signOut(router)} src="/icons/return.svg" />

      <S.OnlineUsers>
        <S.UsersIcon
          onClick={() => console.log('users')}
          src="/icons/users.svg"
        />
        <span>1</span>
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
              const maxUsers = room.slots.filter((slot) => slot !== 'closed')
                .length;
              const usersLength = room.users.length;
              const enabled = maxUsers !== usersLength;

              return (
                <S.ListItem
                  disabled={!enabled}
                  key={room.id}
                  onClick={enabled ? () => joinRoom(room.id) : undefined}
                >
                  <span>{room.name}</span>
                  <span>
                    {usersLength}/{maxUsers}
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
