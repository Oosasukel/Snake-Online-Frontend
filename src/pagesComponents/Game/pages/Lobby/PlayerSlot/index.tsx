import SnakeAvatar from 'components/SnakeAvatar';
import { forwardRef, useImperativeHandle, useState } from 'react';
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
  itIsMe?: boolean;
}

export interface PlayerSlotRef {
  message: (message: string) => void;
}

const PlayerSlot = forwardRef<PlayerSlotRef, PlayerProps>(
  (
    { owner, canKick, ready, empty, name, canClose, canOpen, closed, itIsMe },
    ref
  ) => {
    const [message, setMessage] = useState('');
    const [timeoutRef, setTimeoutRef] = useState<
      ReturnType<typeof setTimeout>
    >();

    useImperativeHandle(
      ref,
      () => ({
        message: (message: string) => {
          setMessage(message);

          if (timeoutRef) {
            clearTimeout(timeoutRef);
          }

          const timeoutId = setTimeout(() => {
            setMessage('');
          }, 4000);

          setTimeoutRef(timeoutId);
        },
      }),
      [timeoutRef]
    );

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
                {message && (
                  <S.MessageBox>
                    <S.MessageTail src="/icons/message-tail.svg" />
                    <S.MessageText>{message}</S.MessageText>
                  </S.MessageBox>
                )}
                <S.PlayerName itIsMe={itIsMe}>{name}</S.PlayerName>
              </>
            )}
            <SnakeAvatar empty={empty} />
          </>
        )}
      </S.Container>
    );
  }
);

PlayerSlot.displayName = 'PlayerSlot';

export default PlayerSlot;
