import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Product } from '../entity/Product';
import { ProductRecommend } from '../entity/ProductRecommend';
import product from '../router/product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findAllProduct = async (id: string) => {
    try {
      const products = await getConnection()
        .getRepository(Product)
        .createQueryBuilder('p')
        .select([
          'p.id as id',
          'p.code as code',
          '(select name from product_category where id = p.type) as type',
          'p.name as name',
          'p.manufacture as manufacture',
          'concat(p.size, (select name from product_unit where product_id = p.code)) as size',
          'p.image as image',
          'p.url as url',
          'if(isnull(pr.id), true, false) as recommend',
        ])
        .leftJoin(ProductRecommend, 'pr', 'p.id = pr.product_id')
        .where('p.code = :code', { code: id })
        .getRawMany();

      return products;
    } catch (e) {
      throw Error(e);
    }
  };

  findOneProduct = async (id: string) => {
    try {
      const product = await getConnection()
        .getRepository(Product)
        .createQueryBuilder('p')
        .select([
          'p.id as id',
          'p.code as code',
          'p.type as type',
          'p.name as name',
          'p.manufacture as manufacture',
          'p.size as size',
          'p.image as image',
          'p.url as url',
          'if(isnull(pr.id), true, false) as recommend',
        ])
        .leftJoin(ProductRecommend, 'pr', 'p.id = pr.product_id')
        .where('p.id = :id', { id })
        .getRawOne();

      return product;
    } catch (e) {
      throw Error(e);
    }
  };

  updateByOption = async (id, updateOption) => {
    try {
      await getConnection()
        .createQueryBuilder()
        .update(Product)
        .set(updateOption)
        .where('id = :id', { id })
        .execute();
    } catch (e) {
      throw Error(e);
    }
  };
}
