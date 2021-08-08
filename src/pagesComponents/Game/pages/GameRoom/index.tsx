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
    incrementUserPoints,
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
  const iAmAliveRef = useRef(true);
  const iAmAlive = useMemo(() => {
    if (!iAmAliveRef.current) return false;

    const me = currentGame.users.find((player) => player.id === user.id);
    if (!me || me.body.length === 0) return false;

    return true;
  }, [currentGame.users, user.id]);
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
                id: winner.id,
                nickname: winner.nickname,
                gamePoints: playerAlive.gamePoints + currentGame.fruits.length,
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
  }, [currentGame.fruits.length, currentGame.users, currentUsers]);
  const ranking = useMemo(() => {
    return currentGame.users
      .map((item) => {
        const currentUserNickname = currentUsers.find(
          (userItem) => userItem.id === item.id
        )?.nickname;

        let points = item.gamePoints;

        if (gameOver && gameOver.winner) {
          const { winner } = gameOver;

          if (winner.id === item.id) {
            points += currentGame.fruits.length;
          }
        }

        return {
          id: item.id,
          name: currentUserNickname,
          points,
        };
      })
      .sort((a, b) => {
        if (a.points < b.points) return 1;
        else if (a.points === b.points) return 0;
        else return -1;
      });
  }, [currentGame.fruits.length, currentGame.users, currentUsers, gameOver]);

  useEffect(() => {
    let lastDirection: 'left' | 'right' | 'bottom' | 'top';
    const lastTouch = { x: 0, y: 0 };

    const handleTouchStart = (event: TouchEvent) => {
      const currentTouch = event.touches[0];
      lastTouch.x = currentTouch.screenX;
      lastTouch.y = currentTouch.screenY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentTouch = event.touches[0];
      const offset = {
        x: currentTouch.screenX - lastTouch.x,
        y: -(currentTouch.screenY - lastTouch.y),
      };

      if (Math.abs(offset.x) < 50 && Math.abs(offset.y) < 50) return;

      lastTouch.x = currentTouch.screenX;
      lastTouch.y = currentTouch.screenY;

      console.log(offset);

      const angle = Math.atan2(offset.y, offset.x);
      const degrees = (180 * angle) / Math.PI;
      const roundedDegrees = (360 + Math.round(degrees)) % 360;
      const angleDirection = Math.round(roundedDegrees / 90);

      console.log('angleDirection', angleDirection);
      console.log('lastDirection', lastDirection);

      let currentDirection = lastDirection;
      switch (angleDirection) {
        case 0: {
          currentDirection = 'right';
          break;
        }
        case 1: {
          currentDirection = 'top';
          break;
        }
        case 2: {
          currentDirection = 'left';
          break;
        }
        case 3: {
          currentDirection = 'bottom';
          break;
        }
        case 4: {
          currentDirection = 'right';
          break;
        }
      }

      if (currentDirection !== lastDirection) {
        lastDirection = currentDirection;
        switch (currentDirection) {
          case 'top': {
            changeDirection(1);
            break;
          }
          case 'right': {
            changeDirection(2);
            break;
          }
          case 'bottom': {
            changeDirection(3);
            break;
          }
          case 'left': {
            changeDirection(4);
            break;
          }
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!iAmAlive && iAmAliveRef.current) {
      const me = ranking.find((r) => r.id === user.id);
      if (me) {
        incrementUserPoints(me.points);
      }
    }

    iAmAliveRef.current = iAmAlive;
  }, [iAmAlive, incrementUserPoints, ranking, user.id]);

  useEffect(() => {
    if (gameOver && gameOver.winner) {
      const { winner } = gameOver;
      if (user.id === winner.id) {
        incrementUserPoints(winner.gamePoints);
      }
    }
  }, [gameOver, incrementUserPoints, user.id]);

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
        <Ranking myId={user.id} users={ranking} />

        <div />
      </S.SectionRanking>
    </S.Container>
  );
};

export default GameRoom;
