import { EntityRepository, getConnection, Repository } from 'typeorm';
import { ProductCategory } from '../entity/ProductCategory';
import { VisitorsCount } from '../entity/VisitorsCount';

@EntityRepository(VisitorsCount)
export class VisitorsCountRepository extends Repository<VisitorsCount> {
  findVisitorsCntWeek = async (prev, next) => {
    try {
      const result = await getConnection()
        .getRepository(VisitorsCount)
        .createQueryBuilder('v')
        .select(['count'])
        .where(
          'date(created) >= date(:prev) and date(created) <= date(:next)',
          { prev, next },
        )
        .orderBy('created')
        .getRawMany();

      return result;
    } catch (e) {
      throw Error(e);
    }
  };
}
