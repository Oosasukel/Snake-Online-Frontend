import { useContext } from 'react';
import { GameContext } from './context/GameContext';
import GameRoom from './pages/GameRoom';
import Home from './pages/Home';
import Lobby from './pages/Lobby';

const routes = {
  home: <Home />,
  lobby: <Lobby />,
  game: <GameRoom />,
};

const Game = () => {
  const { currentRoute } = useContext(GameContext);

  return routes[currentRoute];
};

export default Game;
