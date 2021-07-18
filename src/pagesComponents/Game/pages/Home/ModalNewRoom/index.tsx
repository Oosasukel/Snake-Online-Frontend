import Button from 'components/Button';
import Input from 'components/Input';
import { FormEvent, MouseEventHandler, useCallback, useRef } from 'react';
import * as S from './styles';

interface ModalNewRoomProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const ModalNewRoom = ({ open, onClose, onCreate }: ModalNewRoomProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitNewRoom = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const roomName = inputRef.current.value;

      if (roomName) {
        onCreate(roomName);
      }
    },
    [onCreate]
  );

  const handleCancel: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();

      onClose();
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Container
        onClick={(event) => event.stopPropagation()}
        onSubmit={submitNewRoom}
      >
        <S.Title>Create a new room</S.Title>
        <Input
          ref={inputRef}
          placeholder="Name"
          style={{ marginBottom: '1rem' }}
        />
        <S.Buttons>
          <Button type="button" onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </S.Buttons>
      </S.Container>
    </S.Overlay>
  );
};

export default ModalNewRoom;
