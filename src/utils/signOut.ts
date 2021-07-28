import { NextRouter } from 'next/router';
import { setCookie } from './cookies';

export const signOut = (router: NextRouter) => {
  setCookie('@Snake/access_token', '', { expires: new Date() });
  setCookie('@Snake/refresh_token', '', { expires: new Date() });
  setCookie('@Snake/user', '', { expires: new Date() });
  router.push('/signin');
};
