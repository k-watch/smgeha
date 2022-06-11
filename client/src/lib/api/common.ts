import client from 'modules/client';

/*
  POST /api/common/findVisitorsCntWeek
*/
export const findVisitorsCntWeek = async (date: any) => {
  const { data } = await client.post('/api/common/findVisitorsCntWeek', date);

  return data;
};
