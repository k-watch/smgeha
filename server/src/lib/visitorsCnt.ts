import { getConnection, getCustomRepository } from 'typeorm';
import { VisitorsCount } from '../entity/VisitorsCount';

const visitorsCnt = async (req, res, next) => {
  // 방문 쿠키 없으면 세팅
  if (!req.cookies['visit']) {
    res.cookie('visit', 'true', {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

    const now = new Date();
    const date = now.getFullYear() + '/' + now.getMonth() + '/' + now.getDate();

    // 오늘 이전이라면 방문자수 + 1
    if (date !== req.cookies['visitDate']) {
      res.cookie('visitDate', date, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      const queryRunner = await getConnection().createQueryRunner();
      try {
        await queryRunner.startTransaction();

        let visitorsCount = await getConnection()
          .getRepository(VisitorsCount)
          .createQueryBuilder('v')
          .select(['count'])
          .where('date(created)=date(now())')
          .getRawOne();

        if (!visitorsCount) {
          let newVisitorsCount = new VisitorsCount();
          newVisitorsCount.count = 1;
          await getConnection()
            .getRepository(VisitorsCount)
            .save(newVisitorsCount);
        } else {
          visitorsCount.count += 1;
          await getConnection()
            .getRepository(VisitorsCount)
            .createQueryBuilder('v')
            .update(VisitorsCount)
            .set({ count: visitorsCount.count })
            .where('date(created)=date(now())')
            .execute();
        }
      } catch (e) {
        await queryRunner.rollbackTransaction();
        return res.status(500).send({ status: e, msg: e.message });
      } finally {
        await queryRunner.release();
      }
    }
  }
  return next();
};

export default visitorsCnt;
