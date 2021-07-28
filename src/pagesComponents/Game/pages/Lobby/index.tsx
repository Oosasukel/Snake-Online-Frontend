import Background1 from 'components/Background1';
import Button from 'components/Button';
import Input from 'components/Input';
import { useRouter } from 'next/router';
import Chat from 'pagesComponents/Game/components/Chat';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { useContext, useRef, useState } from 'react';
import PlayerSlot, { PlayerSlotRef } from './PlayerSlot';
import * as S from './styles';

const Lobby = () => {
  const router = useRouter();
  const { currentRoom, user } = useContext(GameContext);
  const [ready, setReady] = useState(false);
  const playerSlotRef = useRef<PlayerSlotRef>();

  const goBack = () => {
    router.push('/signin');
  };

  return (
    <S.Container>
      <Background1 />

      <S.SectionChat>
        <S.TitleContainer>
          <S.ReturnIcon onClick={goBack} src="/icons/return.svg" />
          <h1>{currentRoom.name}</h1>
        </S.TitleContainer>

        <Chat
          onMessage={(message) => {
            if (message.sender === 'Oosasukel') {
              playerSlotRef.current.message(message.text);
            }
          }}
        />
      </S.SectionChat>

      <S.SectionRoom>
        <S.PlayersContainer>
          {currentRoom.slots.map((slot, index) => {
            const hasUser = !['closed', 'open'].includes(slot);
            const currentUser = hasUser
              ? currentRoom.users.find((item) => item.id === slot)
              : null;
            const currentUserIsOwner = currentRoom.owner === currentUser?.id;
            const iAmOwner = currentRoom.owner === user.id;
            const closed = slot === 'closed';

            return (
              <PlayerSlot
                key={index}
                empty={!closed && !currentUser}
                name={currentUser?.nickname}
                owner={currentUserIsOwner}
                canKick={iAmOwner && currentUser?.id !== user.id}
                canClose={iAmOwner && !closed}
                canOpen={iAmOwner && closed}
                closed={closed}
                ready={iAmOwner && currentUser?.ready}
              />
            );
          })}
        </S.PlayersContainer>
        <S.ConfigContainer>
          <S.Config
            onSubmit={(data) => {
              console.log(data);
            }}
          >
            <span>Map size</span>
            <Input name="size" defaultValue={currentRoom.mapSize} />
          </S.Config>

          <S.ReadyText>
            Click here when you{"'"}re
            <br />
            ready to start
          </S.ReadyText>
          <Button
            variant={ready ? 'secondary' : 'primary'}
            size="large"
            fullWidth={false}
            onClick={() => setReady(!ready)}
          >
            {ready ? 'CANCEL' : 'READY'}
          </Button>
        </S.ConfigContainer>
      </S.SectionRoom>
    </S.Container>
  );
};

export default Lobby;
