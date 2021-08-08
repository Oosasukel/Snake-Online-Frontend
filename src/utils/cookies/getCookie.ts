import { Keys } from './types';

export const getCookie = (key: Keys) =>
  document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')?.pop() || '';
