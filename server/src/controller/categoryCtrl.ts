import { ProductCategory } from '../entity/ProductCategory';
import { getConnection, In } from 'typeorm';
import { Request, Response } from 'express';
import { ProductUnit } from '../entity/ProductUnit';

/*
  GET /category/header
  헤더 카테고리 가져옴
*/
export const getHeaderCategory = async (req: Request, res: Response) => {
  const category = await getConnection()
    .getRepository(ProductCategory)
    .find({ where: { parent: 0 } });

  if (category.length === 0) {
    return res.status(404).send(); // Not Found
  }
  return res.send(category);
};

/*
  GET /category/productManufacture/:id
  parent 에 해당하는 카테고리 가져옴
*/
export const findProductManufacture = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await getConnection()
    .getRepository(ProductCategory)
    .find({ where: { parent: id, type: 1 } });

  if (category.length === 0) {
    return res.status(404).send(); // Not Found
  }
  return res.send(category);
};

/*
  GET /category/productType/:id
  parent 에 해당하는 카테고리 가져옴
*/
export const findProductTypeCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await getConnection()
    .getRepository(ProductCategory)
    .find({ where: { parent: id, type: 2 } });

  if (category.length === 0) {
    return res.status(404).send(); // Not Found
  }
  return res.send(category);
};
