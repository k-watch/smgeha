import client from 'modules/client';

export const findAllProducts = async (id: number) => {
  const { data } = await client.get(`/api/products/${id}`);

  return data;
};
