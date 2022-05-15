import client from 'modules/client';

/*
  GET /api/product
*/
export const findOneProduct = async (id: number) => {
  const { data } = await client.get(`/api/product/${id}`);

  return data;
};

/*
  GET /api/product/write
*/
export const findOneProductWrite = async (id: number) => {
  const { data } = await client.get(`/api/product/write/${id}`);

  return data;
};

/*
  GET /api/product/unit
*/
export const findOneProductUnit = async (id: number) => {
  const { data } = await client.get(`/api/product/unit/${id}`);

  return data;
};

/*
  POST /api/product
  {
    code: number,
    name: string,
    manufacture: string,
    size: number,
    type: number,
    image: file [png, jpg, jpeg],
    url: string,
    recoomend: boolean (추천기능)
  }
*/
export const write = async (form: FormData) => {
  const { data } = await client.post('/api/product', form);

  return data;
};

/*
  PATCH /api/product
  {
    code: number,
    name: string,
    manufacture: string,
    size: number,
    type: number,
    image: file [png, jpg, jpeg],
    url: string,
    recoomend: boolean (추천기능)
  }
*/
export const update = async ({ id, formData }: any) => {
  const { data } = await client.patch(`/api/product/${id}`, formData);

  return data;
};

/*
  DELETE /api/product
*/
export const remove = async (id: number) => {
  const { data } = await client.delete(`/api/product/${id}`);

  return data;
};
