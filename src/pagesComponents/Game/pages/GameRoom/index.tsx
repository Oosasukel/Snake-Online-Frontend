import Background2 from 'components/Background2';
import Ranking from 'components/Ranking';
import Chat from 'pagesComponents/Game/components/Chat';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { Direction } from 'pagesComponents/Game/context/types';
import { useContext, useEffect, useRef, useState } from 'react';
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
    currentRoom,
    leaveRoom,
    user,
    changeDirection,
  } = useContext(GameContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const game = new Game(ctx, currentGame.mapSize, user.id);
    game.drawGame(currentGame);
    setGame(game);

    const resizeGame = () => {
      game.canvasResize();
    };

    const handleChangeDirection = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'w': {
          changeDirection(directions.up);
          break;
        }
        case 'ArrowUp': {
          changeDirection(directions.up);
          break;
        }
        case 's': {
          changeDirection(directions.down);
          break;
        }
        case 'ArrowDown': {
          changeDirection(directions.down);
          break;
        }
        case 'a': {
          changeDirection(directions.left);
          break;
        }
        case 'ArrowLeft': {
          changeDirection(directions.left);
          break;
        }
        case 'd': {
          changeDirection(directions.right);
          break;
        }
        case 'ArrowRight': {
          changeDirection(directions.right);
          break;
        }
      }
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
            const currentUserNickname = currentRoom.users.find(
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
