import { useCallback } from 'react';
import api from 'services/api';

export const useApi = () => {
  const apiLogin = useCallback(
    async (data: { login: string; password: string }) => {
      return api.post('/api/authenticate', data);
    },
    []
  );

  const apiSignUp = useCallback(
    async (data: { nickname: string; email: string; password: string }) => {
      return api.post('/api/register', data);
    },
    []
  );

  return { apiLogin, apiSignUp };
};
