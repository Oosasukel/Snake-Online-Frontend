import { Keys, keysPrefix } from './types';

export const setStorage = (
  key: Keys,
  value: string | Record<string, unknown>
) => {
  localStorage.setItem(`${keysPrefix}/${key}`, JSON.stringify(value));
};
