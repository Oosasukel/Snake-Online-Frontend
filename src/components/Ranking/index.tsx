import * as S from './styles';

interface User {
  id: string;
  name: string;
  points: number;
}

interface RankingProps {
  users: User[];
  myId: string;
}

const Ranking = ({ users, myId }: RankingProps) => {
  return (
    <S.Container>
      {users.map((user, index) => (
        <S.User active={user.id === myId} key={user.id}>
          <span>{index + 1}º</span>
          <span title={user.name}>{user.name}</span>
          <span>{user.points}</span>
        </S.User>
      ))}
    </S.Container>
  );
};

export default Ranking;
