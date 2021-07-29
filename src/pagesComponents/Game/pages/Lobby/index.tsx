import Background1 from 'components/Background1';
import Button from 'components/Button';
import Input from 'components/Input';
import Chat, { ChatMessage } from 'pagesComponents/Game/components/Chat';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { createRef, useCallback, useContext, useMemo, useState } from 'react';
import PlayerSlot, { PlayerSlotRef } from './PlayerSlot';
import * as S from './styles';

const Lobby = () => {
  const { currentRoom, user, leaveRoom } = useContext(GameContext);
  const [ready, setReady] = useState(false);
  const playersSlotsRefs = useMemo(
    () => Array.from(Array(12).keys()).map(() => createRef<PlayerSlotRef>()),
    []
  );

  const showBalloonMessage = useCallback(
    (message: ChatMessage) => {
      const userSender = currentRoom.users.find(
        (item) => item.nickname === message.sender
      );

      if (!userSender) return;

      const slotIndex = currentRoom.slots.findIndex(
        (slot) => slot === userSender.id
      );

      if (slotIndex === -1) return;

      playersSlotsRefs[slotIndex].current?.message(message.text);
    },
    [currentRoom, playersSlotsRefs]
  );

  return (
    <S.Container>
      <Background1 />

      <S.SectionChat>
        <S.TitleContainer>
          <S.ReturnIcon onClick={leaveRoom} src="/icons/return.svg" />
          <h1>{currentRoom.name}</h1>
        </S.TitleContainer>

        <Chat onMessage={showBalloonMessage} />
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
                ref={playersSlotsRefs[index]}
                key={index}
                empty={!closed && !currentUser}
                name={currentUser?.nickname}
                owner={currentUserIsOwner}
                canKick={iAmOwner && currentUser?.id !== user.id}
                canClose={iAmOwner && !closed}
                canOpen={iAmOwner && closed}
                closed={closed}
                ready={iAmOwner && currentUser?.ready}
                itIsMe={currentUser?.id === user.id}
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
