import client from 'modules/client';
import qs from 'qs';

export const findOneProduct = async (id: number) => {
  const { data } = await client.get(`/api/product/${id}`);

  return data;
};
