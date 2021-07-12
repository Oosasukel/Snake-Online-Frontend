import SnakeAvatar from 'components/SnakeAvatar';
import * as S from './styles';

interface PlayerProps {
  owner?: boolean;
  canKick?: boolean;
  ready?: boolean;
  empty?: boolean;
  name?: string;
  canClose?: boolean;
  canOpen?: boolean;
  closed?: boolean;
}

const PlayerSlot = ({
  owner,
  canKick,
  ready,
  empty,
  name,
  canClose,
  canOpen,
  closed,
}: PlayerProps) => {
  return (
    <S.Container empty={empty} closed={closed}>
      {closed ? (
        <S.ClosedContainer>
          <S.SlotClosedIcon src="/icons/close.svg" />
          {canOpen && <span>Click to open</span>}
        </S.ClosedContainer>
      ) : (
        <>
          {empty ? (
            <>{canClose && <S.EmptyText>Click to close</S.EmptyText>}</>
          ) : (
            <>
              {owner && <S.OwnerIcon src="/icons/crown.svg" />}
              {canKick && <S.CloseIcon src="/icons/close.svg" />}
              {ready && <S.CheckIcon src="/icons/check.svg" />}
              <S.PlayerName>{name}</S.PlayerName>
            </>
          )}
          <SnakeAvatar empty={empty} />
        </>
      )}
    </S.Container>
  );
};

export default PlayerSlot;
