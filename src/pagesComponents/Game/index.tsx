import { GameProvider } from './context/GameProvider';
import Home from './pages/Home';

const Game = () => {
  return (
    <GameProvider>
      <Home />
    </GameProvider>
  );
};

export default Game;
