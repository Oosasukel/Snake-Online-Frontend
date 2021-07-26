interface SetCookieOptions {
  expires?: Date;
}

export const setCookie = (
  key: string,
  value: string,
  options?: SetCookieOptions
) => {
  document.cookie = `${key}=${value}${
    options?.expires ? `; expires=${options.expires.toUTCString()}` : ''
  }`;
};
