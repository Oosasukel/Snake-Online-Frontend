import SnakeAvatar from 'components/SnakeAvatar';
import * as S from './styles';

interface PlayerProps {
  owner?: boolean;
}

const Player = ({ owner }: PlayerProps) => {
  return (
    <S.Container>
      {owner && <S.OwnerIcon src="/icons/crown.svg" />}
      <S.PlayerName>Oosasukel</S.PlayerName>
      <SnakeAvatar />
    </S.Container>
  );
};

export default Player;
