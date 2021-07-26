import { GetServerSideProps } from 'next';
import Game from 'pagesComponents/Game';
import { GameProvider } from 'pagesComponents/Game/context/GameProvider';

const HomePage = ({ user }) => {
  return (
    <GameProvider user={user}>
      <Game />
    </GameProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  /*
    Busca os tokens nos cookies

    if(existeAccess){
      autentica com o access
    }
    else if (existeRefresh){
      atualiza os tokens com o refresh e autentica com o novo access
    }
    else {
      manda para página de login
    }

    console.log(context.req.cookies);
  */

  return {
    props: {
      user: {
        nickname: 'Rodrigo',
      },
    },
  };
};

export default HomePage;
