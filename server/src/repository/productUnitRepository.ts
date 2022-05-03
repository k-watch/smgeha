import { EntityRepository, getConnection, Repository } from 'typeorm';
import { ProductUnit } from '../entity/ProductUnit';

@EntityRepository(ProductUnit)
export class ProductUnitRepository extends Repository<ProductUnit> {
  findByProductId = async (id: string) => {
    const unit = await getConnection()
      .getRepository(ProductUnit)
      .findOne({ where: { productId: id } });

    return unit;
  };
}
