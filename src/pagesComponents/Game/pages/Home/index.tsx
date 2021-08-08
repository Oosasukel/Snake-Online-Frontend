import { Form } from '@unform/web';
import Background1 from 'components/Background1';
import Button from 'components/Button';
import Input from 'components/Input';
import SnakeAvatar from 'components/SnakeAvatar';
import Chat from 'pagesComponents/Game/components/Chat';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { useCallback, useContext, useState } from 'react';
import ModalNewRoom from './components/ModalNewRoom';
import ModalRanking from './components/ModalRanking';
import * as S from './styles';

const Home = () => {
  const {
    joinRoom,
    user,
    rankingPosition,
    rooms,
    ranking,
    playersOnline,
    createRoom,
    requestRanking,
    ping,
    signOut,
  } = useContext(GameContext);
  const [rankingOpen, setRankingOpen] = useState(false);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);

  /** @TODO inplementar busca */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const searchRoom = useCallback(() => {}, []);

  const handleRequestRanking = useCallback(() => {
    requestRanking();
    setRankingOpen(true);
  }, [requestRanking]);

  return (
    <S.Container>
      <Background1 />
      <ModalNewRoom
        open={modalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
        onCreate={(roomName) => createRoom(roomName)}
      />
      <ModalRanking
        userId={user.id}
        ranking={ranking}
        onClose={() => setRankingOpen(false)}
        open={rankingOpen}
      />
      <S.Ping>Ping: {ping}ms</S.Ping>
      <S.ReturnIcon onClick={() => signOut()} src="/icons/return.svg" />

      <S.OnlineUsers>
        <S.UsersIcon src="/icons/users.svg" />
        <span>{playersOnline}</span>
      </S.OnlineUsers>

      <S.SectionPlayer>
        <S.PlayerInfo>
          <S.PlayerNickname>{user.nickname}</S.PlayerNickname>
          <S.PlayerAvatarContainer>
            <SnakeAvatar />
            <S.PlayerStatus>
              <S.Status>
                <S.StatusIcon src="/icons/apple.svg" />
                <S.StatusLabel>{user.points}</S.StatusLabel>
              </S.Status>
              <S.Status onClick={handleRequestRanking}>
                <S.StatusIcon src="/icons/trophy.svg" />
                <S.StatusLabel>
                  {rankingPosition ? `${rankingPosition}º` : '--'}
                </S.StatusLabel>
              </S.Status>
            </S.PlayerStatus>
          </S.PlayerAvatarContainer>
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
