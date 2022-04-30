import client from 'modules/client';

export const findAllProducts = async (id: number) => {
  const { data } = await client.get(`/api/products/${id}`);

  return data;
};

export const findOneProductUnit = async (id: number) => {
  const { data } = await client.get(`/api/product/unit/${id}`);

  return data;
};

export const write = async (form: FormData) => {
  const { data } = await client.post('/api/product', form);

  return data;
};

export const remove = async (id: number) => {
  const { data } = await client.delete(`/api/product/${id}`);

  return data;
};
