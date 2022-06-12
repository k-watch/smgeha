import { getCustomRepository } from 'typeorm';
import { VisitorsCountRepository } from '../repository/visitorsCountRepository';

export const findVisitorsCntWeek = async (prev, next) => {
  try {
    let result = await getCustomRepository(
      VisitorsCountRepository,
    ).findVisitorsCntWeek(prev, next);

    // 방문자 수 체크 이전 날짜라면
    if (result.length !== 7) {
      return [];
    }

    return result.map((r) => r.count);
  } catch (e) {
    throw Error(e);
  }
};
