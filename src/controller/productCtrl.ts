import Joi from 'joi';
import { getConnection } from 'typeorm';
import { Product } from '../entity/Product';

/*
  GET /products/:id
*/
export const findAllProduct = async (req, res) => {
  // 동적 파라메터가 정규표현식으로 변경이 되면 첫번째 파라메터를 가져와야 한다. ex: {'0': '1'}
  // const id = req.params[0];
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
export const findOneProduct = async (req, res) => {
  // 동적 파라메터가 정규표현식으로 변경이 되면 첫번째 파라메터를 가져와야 한다. ex: {'0': '1'}
  // const id = req.params[0];
  const { id } = req.params;

  const product = await getConnection()
    .getRepository(Product)
    .find({ where: { id } });

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
    serial: '분류 시리얼',
    manufacture: '제조사',
    size: '크기',
    type: 0,
    image: 'image.png',
    url: 'url.com'
  }
*/
export const write = async (req, res) => {
  // Request Body 검증하기
  const schema = Joi.object().keys({
    code: Joi.number().required(),
    name: Joi.string().required(),
    serial: Joi.string().required(),
    manufacture: Joi.string().required(),
    size: Joi.string().required(),
    type: Joi.number().required(),
    image: Joi.string().required(),
    url: Joi.string(),
  });

  const validate = schema.validate(req.body);
  if (validate.error) {
    return res.status(400).send(validate.error);
  }

  const { code, name, serial, manufacture, size, type, image, url } = req.body;

  try {
    const product = new Product();

    product.code = code;
    product.name = name;
    product.serial = serial;
    product.manufacture = manufacture;
    product.size = size;
    product.type = type;
    product.image = image;
    product.url = url;

    await getConnection().getRepository(Product).save(product);
  } catch (e) {
    res.status(500).send(e);
  }

  return res.send();
};

/*
  PATCH /product/:id
  {
    code: 0,
    name: '제품명',
    serial: '분류 시리얼',
    manufacture: '제조사',
    size: '크기',
    type: 0,
    image: 'image.png',
    url: 'url.com'
  }
*/
export const update = async (req, res) => {
  // Request Body 검증하기
  const schema = Joi.object().keys({
    code: Joi.number(),
    name: Joi.string(),
    serial: Joi.string(),
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

  const { id } = req.params;
  const { code, name, serial, manufacture, size, type, image, url } = req.body;

  const updateOption = {};
  if (code) {
    updateOption['code'] = code;
  }
  if (name) {
    updateOption['name'] = name;
  }
  if (serial) {
    updateOption['serial'] = serial;
  }
  if (manufacture) {
    updateOption['manufacture'] = manufacture;
  }
  if (size) {
    updateOption['size'] = size;
  }
  if (type) {
    updateOption['type'] = type;
  }
  if (image) {
    updateOption['image'] = image;
  }
  if (url) {
    updateOption['url'] = url;
  }

  try {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Product)
      .set(updateOption)
      .where('id = :id', { id })
      .execute();

    return res.send(result);
  } catch (e) {
    return res.status(500).send(e);
  }
};

/*
  DELETE /product/:id
*/
export const remove = async (req, res) => {
  // 동적 파라메터가 정규표현식으로 변경이 되면 첫번째 파라메터를 가져와야 한다. ex: {'0': '1'}
  // const id = req.params[0];
  const { id } = req.params;

  try {
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where('id = :id', { id })
      .execute();

    return res.status(204).send(result); // No Content (성공하기는 했지만 응답할 데이터는 없음)
  } catch (e) {
    return res.status(500).send(e);
  }
};
