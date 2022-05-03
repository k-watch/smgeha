import { EntityRepository, getConnection, Repository } from 'typeorm';
import { ProductSubImage } from '../entity/ProductSubImage';

@EntityRepository(ProductSubImage)
export class ProductSubImageRepository extends Repository<ProductSubImage> {
  findById = async (id: string) => {
    try {
      const images = await getConnection()
        .getRepository(ProductSubImage)
        .find({ where: { id } });

      return images;
    } catch (e) {
      throw Error(e);
    }
  };

  findByProductId = async (id: string) => {
    try {
      const images = await getConnection()
        .getRepository(ProductSubImage)
        .createQueryBuilder('productsubimage')
        .where('product_id=:product_id', { product_id: id })
        .getMany();

      return images;
    } catch (e) {
      throw Error(e);
    }
  };

  DeleteByProductId = async (id: string) => {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(ProductSubImage)
        .where('product_id=:product_id', { product_id: id })
        .execute();
    } catch (e) {
      throw Error(e);
    }
  };
}
