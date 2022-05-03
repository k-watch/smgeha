import { getConnection } from 'typeorm';
import { ProductCategory } from '../entity/ProductCategory';

export const getHeaderCategory = async () => {
  const category = await getConnection()
    .getRepository(ProductCategory)
    .find({ where: { parent: 0 } });

  if (category.length === 0) {
    return null;
  }
  return category;
};

export const findProductManufacture = async (id: number) => {
  const category = await getConnection()
    .getRepository(ProductCategory)
    .find({ where: { parent: id, type: 1 } });

  if (category.length === 0) {
    return null;
  }
  return category;
};

export const findProductTypeCategory = async (id: number) => {
  const category = await getConnection()
    .getRepository(ProductCategory)
    .find({ where: { parent: id, type: 2 } });

  if (category.length === 0) {
    return null;
  }
  return category;
};
