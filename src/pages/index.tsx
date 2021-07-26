import Cookies from 'cookies';
import jwt_decode from 'jwt-decode';
import { GetServerSideProps } from 'next';
import Game from 'pagesComponents/Game';
import { GameProvider } from 'pagesComponents/Game/context/GameProvider';
import api from 'services/api';

const HomePage = ({ user }) => {
  return (
    <GameProvider user={user}>
      <Game />
    </GameProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);

  const access_token = cookies.get('@Snake/access_token');
  const refresh_token = cookies.get('@Snake/refresh_token');
  const user = cookies.get('@Snake/user');

  if (access_token && user) {
    return {
      props: {
        user: JSON.parse(user),
      },
    };
  } else if (refresh_token && user) {
    try {
      const { data } = await api.post('/api/refresh_token', { refresh_token });
      const { access_token: newAccess, refresh_token: newRefresh } = data;

      const { exp: accessExp }: { exp: number } = jwt_decode(newAccess);
      const { exp: refreshExp }: { exp: number } = jwt_decode(newRefresh);

      cookies.set('@Snake/access_token', newAccess, {
        expires: new Date(accessExp * 1000),
      });
      cookies.set('@Snake/refresh_token', newRefresh, {
        expires: new Date(refreshExp * 1000),
      });

      return {
        props: {
          user: JSON.parse(user),
        },
      };
    } catch {}
  }

  return {
    redirect: {
      destination: '/signin',
      permanent: false,
    },
  };
};

export default HomePage;
