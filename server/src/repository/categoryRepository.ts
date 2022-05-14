import { EntityRepository, getConnection, Repository } from 'typeorm';
import { ProductCategory } from '../entity/ProductCategory';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {
  findWriteCategory = async () => {};
}
