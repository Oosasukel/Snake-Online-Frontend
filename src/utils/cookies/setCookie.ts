import { Keys } from './types';

interface SetCookieOptions {
  expires?: Date;
}

export const setCookie = (
  key: Keys,
  value: string,
  options?: SetCookieOptions
) => {
  document.cookie = `${key}=${value}${
    options?.expires ? `; expires=${options.expires.toUTCString()}` : ''
  }`;
};
