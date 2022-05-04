import { Response } from 'express';
import { Request } from 'express-serve-static-core';
import Joi from 'joi';
import { checkImg, deleteFile } from '../../src/lib/fileManager';
import { getConnection, getCustomRepository, getManager } from 'typeorm';
import { Product } from '../entity/Product';
import fs from 'fs';
import { getMultipleColums } from '../../src/lib/queryManager';
import { ProductSubImage } from '../../src/entity/ProductSubImage';
import { ProductUnit } from '../entity/ProductUnit';
import { ProductRecommend } from '../entity/ProductRecommend';
import * as productService from '../service/product.service';

/*
  GET /products/:id
*/
export const findAllProduct = async (req, res) => {
  const { id } = req.params;

  const products = await productService.findAllProduct(id);

  if (!products) {
    res.status(404).send({ status: 404, msg: 'Not Found' });
    return;
  }

  res.send(products);
};

/*
  GET /product/:id
*/
export const findOneProduct = async (req, res) => {
  const { id } = req.params;

  const { product, productSubImage } = await productService.findOneProduct(id);

  if (!product) {
    res.status(404).send({ status: 404, msg: 'Not Found' }); // Not Found
    return;
  }
  return res.send({ product, productSubImage });
};

/*
  GET /productWrite/:id
*/
export const findOneProductWrite = async (req, res) => {
  const { id } = req.params;

  const { product, productSubImage } = await productService.findOneProductWrite(
    id,
  );

  if (!product) {
    res.status(404).send({ status: 404, msg: 'Not Found' }); // Not Found
    return;
  }
  return res.send({ product, productSubImage });
};

/*
  POST /product
  {
    code: 0,
    name: '제품명',
    manufacture: '제조사',
    size: '크기',
    type: 0,
    image: file [png, jpg, jpeg],
    url: 'url.com'
    recoomend: boolean (추천기능)
  }
*/
export const write = async (req: Request, res: Response) => {
  if (req.files.length === 0) {
    res.status(400).send({ status: 400, msg: 'Image Not Found' });
    return;
  }

  const schema = Joi.object().keys({
    recommend: Joi.boolean().required(),
    code: Joi.number().required(),
    name: Joi.string().required(),
    manufacture: Joi.string().required(),
    size: Joi.string().required(),
    type: Joi.number().required(),
    url: Joi.string(),
  });

  const validate = schema.validate(req.body);
  if (validate.error) {
    // 누락된 정보가 있다면 등록된 파일 삭제
    if (req.files) {
      deleteFile(req.files);
    }
    res.status(400).send({ status: 400, msg: validate.error });
    return;
  }

  try {
    await productService.write(req.body, req.files);
  } catch (e) {
    res.status(500).send({ status: e, msg: e.message });
    return;
  }

  res.send();
};

/*
  PATCH /product/:id
  {
    code: 0,
    name: '제품명',
    manufacture: '제조사',
    size: '크기',
    type: 0,
    image: 'image.png',
    url: 'url.com'
    recommend: boolean (추천기능)
  }
*/
export const update = async (req, res) => {
  const schema = Joi.object().keys({
    recommend: Joi.boolean().required(),
    code: Joi.number(),
    name: Joi.string(),
    manufacture: Joi.string(),
    size: Joi.string(),
    type: Joi.number(),
    url: Joi.string(),
  });

  const validate = schema.validate(req.body);
  if (validate.error) {
    res.status(400).send(validate.error);
    return;
  }

  try {
    const { id } = req.params;

    productService.update(id, req.body, req.files);
  } catch (e) {
    res.status(500).send({ status: e, msg: e.message });
    return;
  }

  res.send();
};

/*
  DELETE /product/:id
*/
export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    productService.remove(id);
  } catch (e) {
    res.status(500).send({ status: e, msg: e.message });
    return;
  }

  res.send();
};

/*
  GET /product/unit/:id
  제품 크기에 대한 단위 가져옴
*/
export const findOneUnit = async (req: Request, res: Response) => {
  const { id } = req.params;

  const unit = await productService.findOneUnit(id);

  if (!unit) {
    res.status(404).send({ status: 404, msg: 'Not Found' });
    return;
  }
  res.send(unit);
};
