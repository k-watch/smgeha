import { getConnection, getCustomRepository } from 'typeorm';
import { Product } from '../entity/Product';
import { ProductRecommend } from '../entity/ProductRecommend';
import { ProductImgInfo } from '../entity/ProductImgInfo';
import { deleteFile } from '../lib/fileManager';
import { getMultipleColums } from '../lib/queryManager';
import { ProductRecommendRepository } from '../repository/productRecommendRepository';
import { ProductRepository } from '../repository/productRepository';
import { ProductImgInfoRepository } from '../repository/productImgInfoRepository';
import { ProductUnitRepository } from '../repository/productUnitRepository';
import { ProductContent } from '../entity/ProductContent';
import { ProductContentRepository } from '../repository/productContentRepository';

export const findAllProduct = async (id: string) => {
  const products = await getCustomRepository(ProductRepository).findAllProduct(
    id,
  );

  const recommendProducts = await getCustomRepository(
    ProductRepository,
  ).findAllRecommendProduct(id);

  if (products.length === 0) {
    return null;
  }

  return { products, recommendProducts };
};

export const findProductsByName = async (name: string) => {
  const products = await getCustomRepository(
    ProductRepository,
  ).findProductsByName(name);

  return products;
};

export const findOneProduct = async (id: string) => {
  const product = await getCustomRepository(ProductRepository).findOneProduct(
    id,
  );

  const productImgInfo = await getCustomRepository(
    ProductImgInfoRepository,
  ).findByProductId(id);

  if (!product) {
    return null;
  }
  return { product, productImgInfo };
};

export const findOneProductWrite = async (id: string) => {
  const product = await getCustomRepository(
    ProductRepository,
  ).findOneProductWrite(id);

  const productImgInfo = await getCustomRepository(
    ProductImgInfoRepository,
  ).findByProductId(id);

  if (!product) {
    return null;
  }
  return { product, productImgInfo };
};

export const write = async (
  { recommend, code, name, manufacture, size, type, url, content },
  files,
) => {
  const product = new Product();

  product.code = code;
  product.name = name;
  product.manufacture = manufacture;
  product.size = size;
  product.type = type;
  product.image = files[0].filename;
  product.url = url;

  const queryRunner = await getConnection().createQueryRunner();
  await queryRunner.startTransaction();

  try {
    // Product ??????
    const productInfo = await getConnection()
      .getRepository(Product)
      .save(product);

    // ProductRecommend ??????
    if (JSON.parse(recommend) === true) {
      const productRecommend = new ProductRecommend();
      productRecommend.productId = productInfo.id;

      await getConnection()
        .getRepository(ProductRecommend)
        .save(productRecommend);
    }

    // ProductContent ??????
    const productContent = new ProductContent();
    productContent.productId = productInfo.id;
    productContent.content = content;

    await getConnection().getRepository(ProductContent).save(productContent);

    // ProductImgInfo ??????
    const images = files as Array<Express.Multer.File>;

    images.map(async (file) => {
      const image = new ProductImgInfo();
      image.product = productInfo;
      image.name = file.filename;
      image.mimetype = file.mimetype;
      image.path = file.path;

      await getConnection().getRepository(ProductImgInfo).save(image);
    });
    await queryRunner.commitTransaction();
  } catch (e) {
    await queryRunner.rollbackTransaction();
    throw Error(e);
  } finally {
    await queryRunner.release();
  }
};

export const update = async (id, data, files) => {
  const queryRunner = await getConnection().createQueryRunner();
  await queryRunner.startTransaction();

  try {
    // ?????? ????????? ?????? pathList
    let pathList = [];
    // ???????????? ??? ????????? ??????
    const updateOption = getMultipleColums(data, 'recommend');

    // ????????? ?????? ????????????
    if (files.length > 0) {
      updateOption['image'] = files[0].filename;

      // ?????? ????????? ?????? path ??? ?????????
      pathList = await getCustomRepository(
        ProductImgInfoRepository,
      ).findByProductId(id);

      // ProductImgInfo ??????
      await getCustomRepository(ProductImgInfoRepository).DeleteByProductId(id);

      // ProductImgInfo ????????? ?????? ProductId ?????????
      const images = files as Array<Express.Multer.File>;

      const product = await getCustomRepository(ProductRepository).findOne(id);

      images.map(async (file) => {
        const image = new ProductImgInfo();
        image.product = product;
        image.name = file.filename;
        image.mimetype = file.mimetype;
        image.path = file.path;

        await getCustomRepository(ProductImgInfoRepository).save(image);
      });
    }
    // ????????? ?????? ???????????? ??????

    // ProductRecommend ??????
    await getCustomRepository(ProductRecommendRepository).DeleteByProdcutId(id);

    // ProductRecommend ??????
    if (JSON.parse(data.recommend) === true) {
      const recommend = new ProductRecommend();
      recommend.productId = Number(id);

      await getCustomRepository(ProductRecommendRepository).save(recommend);
    }

    // ProductContent ??????
    await getCustomRepository(ProductContentRepository).DeleteByProdcutId(id);

    // ProductContent ??????
    const productContent = new ProductContent();
    productContent.productId = id;
    productContent.content = data.content;

    await getConnection().getRepository(ProductContent).save(productContent);

    // Product ??????
    await getCustomRepository(ProductRepository).updateByOption(
      id,
      updateOption,
    );

    await queryRunner.commitTransaction();

    // DB ????????? ?????? ???????????? ?????? ??????
    if (pathList.length > 0) {
      deleteFile(pathList);
    }
  } catch (e) {
    await queryRunner.rollbackTransaction();
    throw Error(e);
  } finally {
    await queryRunner.release();
  }
};

export const remove = async (id) => {
  const queryRunner = await getConnection().createQueryRunner();
  await queryRunner.startTransaction();

  try {
    // ?????? ????????? ?????? path ??? ?????????
    let pathList = await getCustomRepository(
      ProductImgInfoRepository,
    ).findByProductId(id);

    // Product ??????
    await getCustomRepository(ProductRepository).delete(id);

    // ProductRecommend ??????
    await getCustomRepository(ProductRecommendRepository).DeleteByProdcutId(id);

    // ProductContent ??????
    await getCustomRepository(ProductContentRepository).DeleteByProdcutId(id);

    // ProductImgInfo ??????
    await getCustomRepository(ProductImgInfoRepository).DeleteByProductId(id);

    await queryRunner.commitTransaction();

    // DB ????????? ?????? ???????????? ?????? ??????
    if (pathList.length > 0) {
      deleteFile(pathList);
    }
  } catch (e) {
    await queryRunner.rollbackTransaction();
    throw Error(e);
  } finally {
    await queryRunner.release();
  }
};

export const findOneUnit = async (id: string) => {
  try {
    const unit = await getCustomRepository(
      ProductUnitRepository,
    ).findByProductId(id);

    if (!unit) {
      return null;
    }

    return unit;
  } catch (e) {
    throw Error(e);
  }
};
