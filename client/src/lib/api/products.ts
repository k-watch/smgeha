import client from 'modules/client';

export const findAllProducts = async (id: number) => {
  const { data } = await client.get(`/api/products/${id}`);

  return data;
};

/*
  POST /api/products
  {
    name: string
  }
*/
export const findOneProductByName = async (name: string) => {
  const { data } = await client.post(`/api/products`, { name });

  return data;
};
