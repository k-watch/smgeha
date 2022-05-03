import { EntityRepository, getConnection, Repository } from 'typeorm';
import { ProductRecommend } from '../entity/ProductRecommend';

@EntityRepository(ProductRecommend)
export class ProductRecommendRepository extends Repository<ProductRecommend> {
  DeleteByProdcutId = async (id: string) => {
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(ProductRecommend)
        .where('product_id=:product_id', { product_id: id })
        .execute();

      return result;
    } catch (e) {
      throw Error(e);
    }
  };
}
