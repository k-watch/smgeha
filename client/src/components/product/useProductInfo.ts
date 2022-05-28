import { findOneProduct } from 'lib/api/product';
import { ProductData, ProductInfoData } from 'modules/product/state';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { ImageListType } from 'react-images-uploading';

function useProductInfo() {
  const productMutation = useMutation<ProductInfoData, Error, number>(
    findOneProduct,
  );

  const [product, setProduct] = useState<ProductData>();

  const { id } = useParams();
  // MUI 반응형에 맞춤
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    initialSlide: 1,
    adaptiveHeight: true,
    className: 'slides',
  };

  const getInfo = async () => {
    await productMutation.mutateAsync(Number(id), {
      onSuccess: (data: ProductInfoData) => {
        const images = [];

        images.push(data.product.image);
        for (const image of data.productImgInfo) {
          images.push(image.name);
        }

        data.product.image = images as ImageListType;

        setProduct(data.product);
      },
      onError: (e) => {
        console.log(e);
      },
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return { product, settings };
}

export default useProductInfo;
