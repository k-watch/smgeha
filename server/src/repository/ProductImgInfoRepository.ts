import { EntityRepository, getConnection, Repository } from 'typeorm';
import { ProductImgInfo } from '../entity/ProductImgInfo';

@EntityRepository(ProductImgInfo)
export class ProductImgInfoRepository extends Repository<ProductImgInfo> {
  findById = async (id: string) => {
    try {
      const images = await getConnection()
        .getRepository(ProductImgInfo)
        .find({ where: { id } });

      return images;
    } catch (e) {
      throw Error(e);
    }
  };

  findByProductId = async (id: string) => {
    try {
      const images = await getConnection()
        .getRepository(ProductImgInfo)
        .createQueryBuilder('pi')
        .where('product_id=:product_id', { product_id: id })
        .orderBy('pi.created')
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
        .from(ProductImgInfo)
        .where('product_id=:product_id', { product_id: id })
        .execute();
    } catch (e) {
      throw Error(e);
    }
  };
}
