import { EntityRepository, getConnection, Repository } from 'typeorm';
import { Product } from '../entity/Product';
import { ProductContent } from '../entity/ProductContent';
import { ProductRecommend } from '../entity/ProductRecommend';
import { ProductUnit } from '../entity/ProductUnit';

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
          '(select name from product_category where id = p.manufacture) as manufacture',
          'concat(p.size, (select name from product_unit where product_id = p.code)) as size',
          'p.image as image',
          'p.url as url',
          'if(isnull(pr.id), false, true) as recommend',
        ])
        .leftJoin(ProductRecommend, 'pr', 'p.id = pr.product_id')
        .where('p.code = :code', { code: id })
        .orderBy('p.updated', 'DESC')
        .getRawMany();

      return products;
    } catch (e) {
      throw Error(e);
    }
  };

  findAllRecommendProduct = async (id: string) => {
    try {
      const products = await getConnection()
        .getRepository(Product)
        .createQueryBuilder('p')
        .select([
          'p.id as id',
          'p.code as code',
          '(select name from product_category where id = p.type) as type',
          'p.name as name',
          '(select name from product_category where id = p.manufacture) as manufacture',
          'concat(p.size, (select name from product_unit where product_id = p.code)) as size',
          'p.image as image',
          'p.url as url',
          'if(isnull(pr.id), false, true) as recommend',
        ])
        .innerJoin(ProductRecommend, 'pr', 'p.id = pr.product_id')
        .orderBy('rand()')
        .getRawMany();

      return products;
    } catch (e) {
      throw Error(e);
    }
  };

  findProductsByName = async (name: string) => {
    try {
      const products = await getConnection()
        .getRepository(Product)
        .createQueryBuilder('p')
        .select([
          'p.id as id',
          'p.code as code',
          '(select name from product_category where id = p.type) as type',
          'p.name as name',
          '(select name from product_category where id = p.manufacture) as manufacture',
          'concat(p.size, (select name from product_unit where product_id = p.code)) as size',
          'p.image as image',
          'p.url as url',
          'if(isnull(pr.id), false, true) as recommend',
        ])
        .leftJoin(ProductRecommend, 'pr', 'p.id = pr.product_id')
        .where('p.name like :name', { name: `%${name}%` })
        .orderBy('p.updated', 'DESC')
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
          '(select name from product_category where id = p.type) as type',
          'p.name as name',
          '(select name from product_category where id = p.manufacture) as manufacture',
          'concat(p.size, (select name from product_unit where product_id = p.code)) as size',
          'p.image as image',
          'p.url as url',
          'if(isnull(pr.id), false, true) as recommend',
          'pc.content as content',
        ])
        .leftJoin(ProductRecommend, 'pr', 'p.id = pr.product_id')
        .innerJoin(ProductUnit, 'pu', 'p.code = pu.product_id')
        .innerJoin(ProductContent, 'pc', 'p.id = pc.product_id')
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

  findOneProductWrite = async (id: string) => {
    try {
      const product = await getConnection()
        .getRepository(Product)
        .createQueryBuilder('p')
        .select([
          'p.id as id',
          `if(isnull(pr.id), 'false', 'true') as recommend`,
          'p.code as code',
          'p.name as name',
          'p.manufacture as manufacture',
          'p.size as size',
          'p.type as type',
          'p.image as image',
          'p.url as url',
          'pu.name as unit',
          'pc.content as content',
        ])
        .leftJoin(ProductRecommend, 'pr', 'p.id = pr.product_id')
        .innerJoin(ProductUnit, 'pu', 'p.code = pu.product_id')
        .leftJoin(ProductContent, 'pc', 'p.id = pc.product_id')
        .where('p.id = :id', { id })
        .getRawOne();

      return product;
    } catch (e) {
      throw Error(e);
    }
  };
}
