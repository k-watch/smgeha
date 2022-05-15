import client from 'modules/client';

/*
  GET /api/category/header
*/
export const getHeaderCategory = async () => {
  const { data } = await client.get(`/api/category/header`);

  return data;
};

/*
  GET /api/category/productWirteCategory
  제품 작성에 필요한 헤더 카테고리
*/
export const findProductWirteCategory = async (id: number) => {
  const { data } = await client.get(`/api/category/productWirteCategory/${id}`);

  return data;
};

/*
  GET /api/category/productManufacture
  제품 작성에 필요한 제조사 카테고리
*/
export const findManuCategory = async (id: number) => {
  const { data } = await client.get(`/api/category/productManufacture/${id}`);

  return data;
};

/*
  GET /api/category/productType
  제품 작성에 필요한 유형 카테고리
*/
export const findTypeCategory = async (id: number) => {
  const { data } = await client.get(`/api/category/productType/${id}`);

  return data;
};
