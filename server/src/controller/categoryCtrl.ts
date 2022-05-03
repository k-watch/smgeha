import { ProductCategory } from '../entity/ProductCategory';
import { getConnection, In } from 'typeorm';
import { Request, Response } from 'express';
import { ProductUnit } from '../entity/ProductUnit';
import * as categoryService from '../service/category.service';

/*
  GET /category/header
  헤더 카테고리 가져옴
*/
export const getHeaderCategory = async (req, res) => {
  const category = await categoryService.getHeaderCategory();

  if (!category) {
    res.status(404).send({ status: 404, msg: 'Not Found' });
    return;
  }
  res.send(category);
};

/*
  GET /category/productManufacture/:id
  parent 에 해당하는 카테고리 가져옴
*/
export const findProductManufacture = async (req, res) => {
  const { id } = req.params;

  const category = await categoryService.findProductManufacture(id);

  if (!category) {
    res.status(404).send({ status: 404, msg: 'Not Found' });
    return;
  }
  res.send(category);
};

/*
  GET /category/productType/:id
  parent 에 해당하는 카테고리 가져옴
*/
export const findProductTypeCategory = async (req, res) => {
  const { id } = req.params;

  const category = await categoryService.findProductTypeCategory(id);

  if (!category) {
    res.status(404).send({ status: 404, msg: 'Not Found' });
    return;
  }
  res.send(category);
};
