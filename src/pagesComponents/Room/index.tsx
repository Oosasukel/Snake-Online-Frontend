import Background1 from 'components/Background1';
import Button from 'components/Button';
import Chat from 'components/Chat';
import Input from 'components/Input';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PlayerSlot from './PlayerSlot';
import * as S from './styles';

const Room = () => {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  return (
    <S.Container>
      <Background1 />

      <S.SectionChat>
        <S.TitleContainer>
          <S.ReturnIcon
            onClick={() => router.push('/')}
            src="/icons/return.svg"
          />
          <h1>Sala do Rodrigo</h1>
        </S.TitleContainer>

        <Chat />
      </S.SectionChat>

      <S.SectionRoom>
        <S.PlayersContainer>
          <PlayerSlot empty={false} name="Oosasukel" owner />
          <PlayerSlot empty={false} name="Oosasukel" canKick />
          <PlayerSlot empty={false} name="Oosasukel" canKick ready />
          <PlayerSlot empty={false} name="Oosasukel" canKick ready />
          <PlayerSlot empty={false} name="Oosasukel" canKick ready />
          <PlayerSlot empty={false} name="Oosasukel" canKick ready />
          <PlayerSlot empty={false} name="Oosasukel" canKick ready />
          <PlayerSlot empty={true} canClose name="Oosasukel" canKick />
          <PlayerSlot empty={true} canClose name="Oosasukel" canKick />
          <PlayerSlot
            empty={true}
            canClose
            canOpen
            closed
            name="Oosasukel"
            canKick
          />
          <PlayerSlot
            empty={true}
            canClose
            canOpen
            closed
            name="Oosasukel"
            canKick
          />
          <PlayerSlot
            empty={true}
            canClose
            canOpen
            closed
            name="Oosasukel"
            canKick
          />
        </S.PlayersContainer>
        <S.ConfigContainer>
          <S.Config>
            <span>Map size</span>
            <Input defaultValue="16" />
          </S.Config>

          <S.ReadyText>
            Click here when you{"'"}re
            <br />
            ready to start
          </S.ReadyText>
          <Button
            variant={ready ? 'secondary' : 'primary'}
            size="large"
            fullWidth={false}
            onClick={() => setReady(!ready)}
          >
            {ready ? 'CANCEL' : 'READY'}
          </Button>
        </S.ConfigContainer>
      </S.SectionRoom>
    </S.Container>
  );
};

export default Room;
