import { FormHandles } from '@unform/core';
import Background1 from 'components/Background1';
import Button from 'components/Button';
import Input from 'components/Input';
import Chat, { ChatMessage } from 'pagesComponents/Game/components/Chat';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { Player } from 'pagesComponents/Game/context/schema';
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

const MIN_MAP_SIZE = 4;
const MAX_MAP_SIZE = 40;

interface ConfigFormData {
  size: number;
}

const Lobby = () => {
  const {
    user,
    leaveRoom,
    closeSlot,
    openSlot,
    ping,
    updateReady,
    kickPlayer,
    updateRoomConfig,
    gameState,
  } = useContext(GameContext);

  const imReady = useMemo(() => {
    const me =
      gameState.players.find((item) => item.id === user.id) || ({} as Player);
    return me.ready;
  }, [gameState.players, user.id]);

  const iAmOwner = useMemo(() => {
    const ownerPlayer = gameState.players.find((item) => item.owner);
    return ownerPlayer?.id === user.id;
  }, [gameState.players, user.id]);

  const allPlayersAccepted = useMemo(
    () =>
      gameState.players.filter((player) => !player.ready && !player.owner)
        .length === 0,
    [gameState.players]
  );

  const configFormRef = useRef<FormHandles>();
  const [mapConfig, setMapConfig] = useState<ConfigFormData>({
    size: gameState.mapSize,
  });

  useEffect(() => {
    setMapConfig((previous) => ({ ...previous, size: gameState.mapSize }));
  }, [gameState.mapSize]);

  const playersSlotsRefs = useMemo(
    () => Array.from(Array(12).keys()).map(() => createRef<PlayerSlotRef>()),
    []
  );

  const showBalloonMessage = useCallback(
    (message: ChatMessage) => {
      const userSender = gameState.players.find(
        (item) => item.name === message.sender
      );

      if (!userSender) return;

      const slotIndex = gameState.slots.findIndex(
        (slot) => slot.player?.id === userSender.id
      );

      if (slotIndex === -1) return;

      playersSlotsRefs[slotIndex].current?.message(message.text);
    },
    [gameState.players, gameState.slots, playersSlotsRefs]
  );

  return (
    <S.Container>
      <Background1 />
      <S.Ping>Ping: {ping}ms</S.Ping>

      <S.SectionChat>
        <S.TitleContainer>
          <S.ReturnIcon onClick={leaveRoom} src="/icons/return.svg" />
          <h1>{gameState.roomName}</h1>
        </S.TitleContainer>

        <Chat onMessage={showBalloonMessage} />
      </S.SectionChat>

      <S.SectionRoom>
        <S.PlayersContainer>
          {gameState.slots.map((slot, index) => {
            const currentUser = slot.player;

            return (
              <PlayerSlot
                ref={playersSlotsRefs[index]}
                key={index}
                empty={!currentUser}
                name={currentUser?.name}
                owner={currentUser?.owner}
                canKick={iAmOwner && currentUser?.id !== user.id}
                canClose={iAmOwner && slot.open}
                canOpen={iAmOwner && !slot.open}
                closed={!slot.open}
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
                  size: gameState.mapSize,
                }));

              let size = Number(data.size);

              if (size < MIN_MAP_SIZE) {
                size = MIN_MAP_SIZE;
                setMapConfig((previous) => ({ ...previous, size }));
              } else if (size > MAX_MAP_SIZE) {
                size = MAX_MAP_SIZE;
                setMapConfig((previous) => ({ ...previous, size }));
              }

              if (size !== gameState.mapSize) {
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
