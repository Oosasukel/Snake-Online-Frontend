import Background2 from 'components/Background2';
import Ranking from 'components/Ranking';
import Chat from 'pagesComponents/Game/components/Chat';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { Direction } from 'pagesComponents/Game/context/types';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Game } from './classes/Game';
import * as S from './styles';

const directions: Record<'up' | 'down' | 'left' | 'right', Direction> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const GameRoom = () => {
  const {
    currentGame,
    ping,
    currentRoom,
    leaveRoom,
    user,
    changeDirection,
  } = useContext(GameContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const currentUsers = useMemo(() => {
    return currentRoom.users;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const game = new Game(ctx, currentGame.mapSize, user.id, currentGame);
    game.drawGame(currentGame);
    setGame(game);

    const resizeGame = () => {
      game.canvasResize();
    };

    const handleChangeDirection = (event: KeyboardEvent) => {
      const events = {
        w: () => changeDirection(directions.up),
        arrowup: () => changeDirection(directions.up),
        s: () => changeDirection(directions.down),
        arrowdown: () => changeDirection(directions.down),
        a: () => changeDirection(directions.left),
        arrowleft: () => changeDirection(directions.left),
        d: () => changeDirection(directions.right),
        arrowright: () => changeDirection(directions.right),
      };

      const eventToTrigger = events[event.key.toLowerCase()];
      if (eventToTrigger) eventToTrigger();
    };

    window.addEventListener('resize', resizeGame);
    document.addEventListener('keydown', handleChangeDirection);

    return () => {
      window.removeEventListener('resize', resizeGame);
      document.removeEventListener('keydown', handleChangeDirection);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (game) {
      game.drawGame(currentGame);
    }
  }, [currentGame, game]);

  return (
    <S.Container>
      <Background2 />
      <S.Ping>Ping: {ping}ms</S.Ping>

      <S.ReturnIcon onClick={leaveRoom} src="/icons/return.svg" />
      <S.Title>{currentRoom.name}</S.Title>

      <Chat />

      <S.SectionGame>
        <canvas ref={canvasRef} />
      </S.SectionGame>

      <S.SectionRanking>
        <Ranking
          myId={user.id}
          users={currentGame.users.map((item) => {
            const currentUserNickname = currentUsers.find(
              (userItem) => userItem.id === item.id
            )?.nickname;

            return {
              id: item.id,
              name: currentUserNickname,
              points: item.gamePoints,
            };
          })}
        />

        <div />
      </S.SectionRanking>
    </S.Container>
  );
};

export default GameRoom;
