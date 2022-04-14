import { LoginState } from 'modules/auth/state';
import client from 'modules/client';
import { useQuery } from 'react-query';

export const login = async ({ username, password }: LoginState) => {
  const { data } = await client.post('/api/auth/login', {
    username,
    password,
  });
  return data;
};

export const logout = async () => {
  await client.post('/api/auth/logout');
};

export const check = async () => {
  await client.get('/api/auth/check');
};
