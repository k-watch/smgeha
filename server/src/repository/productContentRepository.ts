import { EntityRepository, getConnection, Repository } from 'typeorm';
import { ProductContent } from '../entity/ProductContent';

@EntityRepository(ProductContent)
export class ProductContentRepository extends Repository<ProductContent> {
  DeleteByProdcutId = async (id: string) => {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(ProductContent)
        .where('product_id=:product_id', { product_id: id })
        .execute();

      return result;
    } catch (e) {
      throw Error(e);
    }
  };
}
