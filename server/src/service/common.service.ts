import { getCustomRepository } from 'typeorm';
import { VisitorsCountRepository } from '../repository/visitorsCountRepository';

export const findVisitorsCntWeek = async (prev, next) => {
  try {
    let result = await getCustomRepository(
      VisitorsCountRepository,
    ).findVisitorsCntWeek(prev, next);

    // 일주일 분량 없으면 빈배열 보내줌
    if (result.length !== 7) {
      return [];
    }

    return result.map((r) => r.count);
  } catch (e) {
    throw Error(e);
  }
};
