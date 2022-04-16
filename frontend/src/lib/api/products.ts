import client from 'modules/client';

export const findAllProduct = async (id: number) => {
  const { data } = await client.get(`/api/products/${id}`);

  return data;
};
