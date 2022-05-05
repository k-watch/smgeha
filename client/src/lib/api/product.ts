import client from 'modules/client';
import qs from 'qs';

export const findOneProduct = async (id: number) => {
  const { data } = await client.get(`/api/product/${id}`);

  return data;
};

export const findOneProductWrite = async (id: number) => {
  const { data } = await client.get(`/api/product/write/${id}`);

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

// interface test {
//   id: string;
//   formData: FormData;
// }

export const update = async ({ id, formData }: any) => {
  const { data } = await client.patch(`/api/product/${id}`, formData);

  return data;
};

export const remove = async (id: number) => {
  const { data } = await client.delete(`/api/product/${id}`);

  return data;
};
