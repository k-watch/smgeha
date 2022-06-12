import { getConnection, getCustomRepository } from 'typeorm';
import { VisitorsCount } from '../entity/VisitorsCount';
import moment from 'moment';

const visitorsCnt = async (req, res, next) => {
  const date = moment().format('DD');

  if (date > req.cookies['visitDate']) {
    // 방문 쿠키 없으면 세팅하고 방문자수 + 1
    res.cookie('visitDate', date, {
      maxAge: 1000 * 60 * 60 * 24 * 1.5,
      httpOnly: true,
      overwrite: true,
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

  return next();
};

export default visitorsCnt;
