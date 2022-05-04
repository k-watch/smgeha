import { EntityRepository, getConnection, Repository } from 'typeorm';
import { ProductCategory } from '../entity/ProductCategory';
import { User } from '../entity/User';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {
  findWriteCategory = async () => {};
}
