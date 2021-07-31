import { FormHandles } from '@unform/core';
import Background1 from 'components/Background1';
import Button from 'components/Button';
import Input from 'components/Input';
import Chat, { ChatMessage } from 'pagesComponents/Game/components/Chat';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { RoomUser } from 'pagesComponents/Game/context/types';
import {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PlayerSlot, { PlayerSlotRef } from './PlayerSlot';
import * as S from './styles';

const MIN_MAP_SIZE = 12;
const MAX_MAP_SIZE = 40;

interface ConfigFormData {
  size: number;
}

const Lobby = () => {
  const {
    currentRoom,
    user,
    leaveRoom,
    closeSlot,
    openSlot,
    updateReady,
    kickPlayer,
    updateRoomConfig,
  } = useContext(GameContext);
  const imReady = useMemo(() => {
    const me =
      currentRoom.users.find((item) => item.id === user.id) || ({} as RoomUser);
    return me.ready;
  }, [currentRoom, user]);
  const iAmOwner = useMemo(() => currentRoom.owner === user.id, [
    currentRoom,
    user,
  ]);
  const allPlayersAccepted = useMemo(
    () =>
      currentRoom.users.filter(
        (item) => item.id !== currentRoom.owner && !item.ready
      ).length === 0,
    [currentRoom]
  );
  const configFormRef = useRef<FormHandles>();
  const [mapConfig, setMapConfig] = useState<ConfigFormData>({
    size: currentRoom.mapSize,
  });

  useEffect(() => {
    setMapConfig((previous) => ({ ...previous, size: currentRoom.mapSize }));
  }, [currentRoom.mapSize]);

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
                ready={currentUser?.ready}
                itIsMe={currentUser?.id === user.id}
                onClose={() => closeSlot(index)}
                onOpen={() => openSlot(index)}
                onKick={
                  currentUser ? () => kickPlayer(currentUser.id) : undefined
                }
              />
            );
          })}
        </S.PlayersContainer>
        <S.ConfigContainer>
          <S.Config
            ref={configFormRef}
            initialData={mapConfig}
            onSubmit={(data: ConfigFormData) => {
              if (!iAmOwner)
                return setMapConfig((previous) => ({
                  ...previous,
                  size: currentRoom.mapSize,
                }));

              let size = Number(data.size);

              if (size < MIN_MAP_SIZE) {
                size = MIN_MAP_SIZE;
                setMapConfig((previous) => ({ ...previous, size }));
              } else if (size > MAX_MAP_SIZE) {
                size = MAX_MAP_SIZE;
                setMapConfig((previous) => ({ ...previous, size }));
              }

              if (size !== currentRoom.mapSize) {
                updateRoomConfig({ size });
              }
            }}
          >
            <span>Map size</span>
            <Input
              disabled={!iAmOwner}
              helperText="12-40"
              name="size"
              pattern="\d*"
              value={mapConfig.size}
              onBlur={() => configFormRef.current.submitForm()}
              onInput={(event) => {
                const isNumber = event.currentTarget.checkValidity();
                if (!isNumber) return;
                const value = Number(event.currentTarget.value);

                setMapConfig((previous) => ({ ...previous, size: value }));
              }}
            />
          </S.Config>

          <S.ReadyText>
            Click here when you{"'"}re
            <br />
            ready to start
          </S.ReadyText>
          <Button
            variant={imReady ? 'secondary' : 'primary'}
            size="large"
            fullWidth={false}
            disabled={iAmOwner && !allPlayersAccepted}
            onClick={
              iAmOwner && !allPlayersAccepted
                ? undefined
                : () => updateReady(!imReady)
            }
          >
            {imReady ? 'CANCEL' : 'READY'}
          </Button>
        </S.ConfigContainer>
      </S.SectionRoom>
    </S.Container>
  );
};

export default Lobby;
