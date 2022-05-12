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

export const findAllProduct = async (id: string) => {
  const products = await getCustomRepository(ProductRepository).findAllProduct(
    id,
  );

  if (products.length === 0) {
    return null;
  }

  return products;
};

export const findOneProductByName = async (name: string) => {
  const products = await getCustomRepository(
    ProductRepository,
  ).findOneProductByName(name);

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
  { recommend, code, name, manufacture, size, type, url },
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
    // Product 저장
    const productInfo = await getConnection()
      .getRepository(Product)
      .save(product);

    // ProductRecommend 저장
    if (Boolean(recommend) === true) {
      const productRecommend = new ProductRecommend();
      productRecommend.productId = productInfo.id;

      await getConnection()
        .getRepository(ProductRecommend)
        .save(productRecommend);
    }

    // ProductImgInfo 저장
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
    // 파일 삭제를 위한 pathList
    let pathList = [];
    // 업데이트 할 컬럼들 셋팅
    const updateOption = getMultipleColums(data, 'recommend');

    // 이미지 파일 업데이트
    if (files.length > 0) {
      updateOption['image'] = files[0].filename;

      // 파일 삭제를 위해 path 를 받아옴
      pathList = await getCustomRepository(
        ProductImgInfoRepository,
      ).findByProductId(id);

      // ProductImgInfo 삭제
      await getCustomRepository(ProductImgInfoRepository).DeleteByProductId(id);

      // ProductImgInfo 저장을 위해 ProductId 받아옴
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
    // 이미지 파일 업데이트 종료

    // ProductRecommend 삭제
    await getCustomRepository(ProductRecommendRepository).DeleteByProdcutId(id);

    // ProductRecommend 저장
    if (Boolean(data.recommend) === true) {
      const recommend = new ProductRecommend();
      recommend.productId = Number(id);

      await getCustomRepository(ProductRecommendRepository).save(recommend);
    }

    // Product 갱신
    await getCustomRepository(ProductRepository).updateByOption(
      id,
      updateOption,
    );

    await queryRunner.commitTransaction();

    // DB 작업이 정상 완료되면 파일 삭제
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
    // 파일 삭제를 위해 path 를 받아옴
    let pathList = await getCustomRepository(
      ProductImgInfoRepository,
    ).findByProductId(id);

    // Product 삭제
    await getCustomRepository(ProductRepository).delete(id);

    // ProductRecommend 삭제
    await getCustomRepository(ProductRecommendRepository).DeleteByProdcutId(id);

    // ProductImgInfo 삭제
    await getCustomRepository(ProductImgInfoRepository).DeleteByProductId(id);

    await queryRunner.commitTransaction();

    // DB 작업이 정상 완료되면 파일 삭제
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
