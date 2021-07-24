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

  const apiRequestPassword = useCallback(async (data: { email: string }) => {
    return api.post('/api/request-new-password ', data);
  }, []);

  const apieResetPassword = useCallback(
    async (data: {
      requestId: string | string[];
      requestSecret: string | string[];
      password: string;
    }) => {
      return api.post('/api/users/new-password ', data);
    },
    []
  );

  return { apiLogin, apiSignUp, apiRequestPassword, apieResetPassword };
};
