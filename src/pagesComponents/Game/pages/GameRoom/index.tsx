import Background2 from 'components/Background2';
import Ranking from 'components/Ranking';
import { useRouter } from 'next/router';
import Chat from 'pagesComponents/Game/components/Chat';
import * as S from './styles';

const GameRoom = () => {
  const router = useRouter();

  return (
    <S.Container>
      <Background2 />

      <S.ReturnIcon onClick={() => router.push('/')} src="/icons/return.svg" />
      <S.Title>Sala do Rodrigo</S.Title>

      <Chat />

      <S.SectionGame></S.SectionGame>

      <S.SectionRanking>
        <Ranking
          myId="2"
          users={[
            {
              id: '1',
              name: 'SoulSilfer',
              points: 18,
            },

            {
              id: '2',
              name: 'Oosasukel',
              points: 16,
            },

            {
              id: '3',
              name: 'TiaDosBolin',
              points: 15,
            },

            {
              id: '4',
              name: 'Aiped Abreu',
              points: 10,
            },

            {
              id: '5',
              name: 'Teste da Silva',
              points: 9,
            },

            {
              id: '6',
              name: 'Anão Careca',
              points: 8,
            },

            {
              id: '7',
              name: 'False',
              points: 8,
            },

            {
              id: '8',
              name: 'Júnior',
              points: 7,
            },
            {
              id: '9',
              name: 'Pudim de Goiaba',
              points: 7,
            },
            {
              id: '10',
              name: 'While true',
              points: 7,
            },
            {
              id: '11',
              name: 'Xuazineguer',
              points: 6,
            },
            {
              id: '12',
              name: 'Baunilha',
              points: 6,
            },
          ]}
        />

        <div />
      </S.SectionRanking>
    </S.Container>
  );
};

export default GameRoom;
