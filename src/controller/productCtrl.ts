import { Response } from 'express';
import { Request } from 'express-serve-static-core';
import Joi from 'joi';
import { checkImg, deleteFile } from '../../src/lib/fileManager';
import { getConnection } from 'typeorm';
import { Product } from '../entity/Product';
import fs from 'fs';
import { getMultipleColums } from '../../src/lib/queryManager';
import { ProductSubImage } from '../../src/entity/ProductSubImage';
const { promisify } = require('util');

/*
  GET /products/:id
*/
export const findAllProduct = async (req, res) => {
  // 동적 파라메터가 정규표현식으로 변경이 되면 첫번째 파라메터를 가져와야 한다. ex: {'0': '1'}
  const { id } = req.params;

  const products = await getConnection()
    .getRepository(Product)
    .find({ where: { code: id } });

  if (products.length === 0) {
    return res.status(404).send(); // Not Found
  }
  return res.send(products);
};

/*
  GET /product/:id
*/
export const findOneProduct = async (req: Request, res: Response) => {
  // 동적 파라메터가 정규표현식으로 변경이 되면 첫번째 파라메터를 가져와야 한다. ex: {'0': '1'}
  const { id } = req.params;

  const product = await getConnection()
    .getRepository(Product)
    .findOne({ relations: ['productSubImage'], where: { id } });

  if (!product) {
    return res.status(404).send(); // Not Found
  }
  return res.send(product);
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
  }
*/
export const write = async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    code: Joi.number().required(),
    name: Joi.string().required(),
    manufacture: Joi.string().required(),
    size: Joi.string().required(),
    type: Joi.number().required(),
    url: Joi.string(),
  });

  const unlinkAsync = promisify(fs.unlink);

  try {
    const validate = schema.validate(req.body);
    if (validate.error) {
      // 누락된 정보가 있다면 등록된 파일 삭제
      if (req.files) {
        deleteFile(req.files);
      }
      return res.status(400).send(validate.error);
    }

    const { code, name, manufacture, size, type, url } = req.body;

    const product = new Product();

    product.code = code;
    product.name = name;
    product.manufacture = manufacture;
    product.size = size;
    product.type = type;
    product.image = req.files[0].filename;
    product.url = url;

    const productInfo = await getConnection()
      .getRepository(Product)
      .save(product);

    const files = req.files as Array<Express.Multer.File>;

    files.map(async (file) => {
      const image = new ProductSubImage();
      image.product = productInfo;
      image.name = file.filename;
      image.mimetype = file.mimetype;
      image.path = file.path;

      await getConnection().getRepository(ProductSubImage).save(image);
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }

  return res.send();
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
  }
*/
export const update = async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    code: Joi.number(),
    name: Joi.string(),
    manufacture: Joi.string(),
    size: Joi.string(),
    type: Joi.number(),
    image: Joi.string(),
    url: Joi.string(),
  });

  const validate = schema.validate(req.body);
  if (validate.error) {
    return res.status(400).send(validate.error);
  }

  try {
    const { id } = req.params;

    // 업데이트 할 컬럼들 셋팅
    const updateOption = getMultipleColums(req.body);

    if (req.files) {
      updateOption['image'] = req.files[0].filename;

      // path 에서 파일 삭제
      const images = await getConnection()
        .getRepository(ProductSubImage)
        .createQueryBuilder('productsubimage')
        .innerJoinAndSelect('productsubimage.product', 'product')
        .where('product.id=:product_id', { product_id: id })
        .getMany();

      deleteFile(images);

      // ProductSubImage Delete
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(ProductSubImage)
        .where('product.id', { id })
        .execute();

      // ProductSubImage Insert
      const files = req.files as Array<Express.Multer.File>;

      const product = await getConnection()
        .getRepository(Product)
        .findOne({ where: { id } });

      files.map(async (file) => {
        const image = new ProductSubImage();
        image.product = product;
        image.name = file.filename;
        image.mimetype = file.mimetype;
        image.path = file.path;

        await getConnection().getRepository(ProductSubImage).save(image);
      });
    }

    // Product Update
    const result = await getConnection()
      .createQueryBuilder()
      .update(Product)
      .set(updateOption)
      .where('id = :id', { id })
      .execute();
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }

  return res.send();
};

/*
  DELETE /product/:id
*/
export const remove = async (req: Request, res: Response) => {
  // 동적 파라메터가 정규표현식으로 변경이 되면 첫번째 파라메터를 가져와야 한다. ex: {'0': '1'}
  // const id = req.params[0];
  const { id } = req.params;

  try {
    // path 에서 파일 삭제
    const images = await getConnection()
      .getRepository(ProductSubImage)
      .createQueryBuilder('productsubimage')
      .innerJoinAndSelect('productsubimage.product', 'product')
      .where('product.id=:product_id', { product_id: id })
      .getMany();

    deleteFile(images);

    // Product 데이터 삭제
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('id = :id', { id })
      .execute();

    // ProductSubImage 삭제
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ProductSubImage)
      .where('product.id', { id })
      .execute();

    return res.status(204).send(); // No Content (성공하기는 했지만 응답할 데이터는 없음)
  } catch (e) {
    return res.status(500).send(e);
  }
};
