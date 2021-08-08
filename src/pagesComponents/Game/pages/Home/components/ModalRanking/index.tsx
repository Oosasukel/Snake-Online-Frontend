import Modal from 'components/Modal';
import { Ranking } from 'pagesComponents/Game/context/types';
import * as S from './styles';

interface ModalRankingProps {
  open: boolean;
  onClose: () => void;
  ranking: Ranking[];
  userId: string;
}

const ModalRanking = ({
  open,
  onClose,
  ranking,
  userId,
}: ModalRankingProps) => {
  if (!open) return null;

  return (
    <Modal onClose={onClose} open={open}>
      <S.Title>Ranking</S.Title>
      <S.RankingList>
        {ranking.map((item) => (
          <S.Item key={item.id} active={userId === item.id}>
            <S.Nickname>{item.nickname}</S.Nickname>
            <S.Apples>{item.points}</S.Apples>
            <S.Position>{item.position}º</S.Position>
          </S.Item>
        ))}
      </S.RankingList>
    </Modal>
  );
};

export default ModalRanking;
