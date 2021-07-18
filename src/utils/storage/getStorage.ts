import { Keys, keysPrefix } from './types';

export const getStorage = (key: Keys) => {
  const isServer = typeof window === 'undefined';
  if (isServer) return;

  const value = window.localStorage.getItem(`${keysPrefix}/${key}`);

  return JSON.parse(value);
};
