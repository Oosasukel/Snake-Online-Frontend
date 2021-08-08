import { FormHandles } from '@unform/core';
import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import { useCallback, useRef } from 'react';
import * as S from './styles';

interface Data {
  name: string;
}

interface ModalNewRoomProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const ModalNewRoom = ({ open, onClose, onCreate }: ModalNewRoomProps) => {
  const formRef = useRef<FormHandles>(null);

  const submitNewRoom = useCallback(
    ({ name }: Data) => {
      formRef.current.setFieldError('name', '');
      if (!name) {
        return formRef.current.setFieldError('name', 'Room name is required.');
      }

      onCreate(name);
    },
    [onCreate]
  );

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!open) return null;

  return (
    <Modal onClose={onClose} open={open}>
      <S.Form
        ref={formRef}
        onClick={(event) => event.stopPropagation()}
        onSubmit={submitNewRoom}
      >
        <S.Title>Create a new room</S.Title>
        <Input
          name="name"
          placeholder="Name"
          style={{ marginBottom: '1rem' }}
        />
        <S.Buttons>
          <Button type="button" onClick={handleCancel} variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </S.Buttons>
      </S.Form>
    </Modal>
  );
};

export default ModalNewRoom;
