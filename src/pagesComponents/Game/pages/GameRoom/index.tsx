import Background2 from 'components/Background2';
import Button from 'components/Button';
import Ranking from 'components/Ranking';
import Chat from 'pagesComponents/Game/components/Chat';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { directions, GameUser } from 'pagesComponents/Game/context/types';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Game } from './classes/Game';
import ModalGameOver from './components/ModalGameOver';
import * as S from './styles';

const GameRoom = () => {
  const {
    currentGame,
    ping,
    currentRoom,
    leaveRoom,
    returnToLobby,
    user,
    changeDirection,
  } = useContext(GameContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const currentUsers = useMemo(() => {
    return currentRoom.users;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const iAmAlive = useMemo(() => {
    const me = currentGame.users.find((player) => player.id === user.id);

    if (!me || me.body.length === 0) {
      return false;
    }

    return true;
  }, [currentGame.users, user.id]);
  const iAmAliveRef = useRef(true);
  const gameOver = useMemo(() => {
    const playersAlive: GameUser[] = [];

    currentGame.users.forEach((player) => {
      if (player.body.length > 0) {
        playersAlive.push(player);
      }
    });

    if (currentGame.users.length > 1 && playersAlive.length < 2) {
      if (playersAlive.length === 1) {
        const playerAlive = playersAlive[0];
        const winner = currentUsers.find(
          (player) => player.id === playerAlive.id
        );

        return {
          winner: winner
            ? {
                nickname: winner.nickname,
                gamePoints: playerAlive.gamePoints,
              }
            : null,
        };
      } else {
        return {
          winner: null,
        };
      }
    } else if (currentGame.users.length === 1 && playersAlive.length === 0) {
      return {
        winner: null,
      };
    }

    return null;
  }, [currentGame.users, currentUsers]);

  useEffect(() => {
    iAmAliveRef.current = iAmAlive;
  }, [iAmAlive]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const game = new Game(ctx, currentGame.mapSize, user.id, currentGame);
    game.drawGame(currentGame);
    setGame(game);

    const resizeGame = () => {
      game.canvasResize();
    };

    const handleChangeDirection = (event: KeyboardEvent) => {
      if (!iAmAliveRef.current) return;

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

      <ModalGameOver onClose={returnToLobby} open={!!gameOver}>
        {!!gameOver && (
          <>
            <S.ModalTitle>Game Over</S.ModalTitle>

            <S.ModalSubtitle>
              {gameOver.winner
                ? `Winner: ${gameOver.winner.nickname} (+${gameOver.winner.gamePoints} points)`
                : 'No Winner'}
            </S.ModalSubtitle>
            <Button onClick={returnToLobby}>Ok</Button>
          </>
        )}
      </ModalGameOver>

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
