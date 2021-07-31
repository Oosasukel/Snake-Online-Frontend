import Background2 from 'components/Background2';
import Ranking from 'components/Ranking';
import Chat from 'pagesComponents/Game/components/Chat';
import { GameContext } from 'pagesComponents/Game/context/GameContext';
import { useContext, useEffect, useRef } from 'react';
import { Game } from './classes/Game';
import * as S from './styles';

const GameRoom = () => {
  const { currentGame, currentRoom, leaveRoom, user } = useContext(GameContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const game = new Game(ctx, currentGame.mapSize);
    game.drawGame();
  }, [currentGame.mapSize]);

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
