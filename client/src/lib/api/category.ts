import client from 'modules/client';

export const getHeaderCategory = async () => {
  const { data } = await client.get(`/api/category/header`);

  return data;
};

export const findProductWirteCategory = async (id: number) => {
  const { data } = await client.get(`/api/category/productWirteCategory/${id}`);

  return data;
};

export const findManuCategory = async (id: number) => {
  const { data } = await client.get(`/api/category/productManufacture/${id}`);

  return data;
};

export const findTypeCategory = async (id: number) => {
  const { data } = await client.get(`/api/category/productType/${id}`);

  return data;
};
