import { findAllProducts } from 'lib/api/products';
import { categorySelector } from 'modules/category/category';
import {
  initAllProducts,
  productsSelector,
  setProducts,
} from 'modules/products/products';
import { ProductsData } from 'modules/products/state';
import { store } from 'modules/store';
import { useCallback, useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useDraggableScroll from 'use-draggable-scroll';

function useProductList() {
  const { productCode } = useSelector(categorySelector);
  const { products } = useSelector(productsSelector);

  const findAllProductsMutation = useMutation<ProductsData[], Error, number>(
    findAllProducts,
  );
  const { isLoading } = findAllProductsMutation;
  const navigate = useNavigate();

  const onClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  // 제품 칩 데이터 가로 스크롤용
  const slideRef = useRef(null);
  const { onMouseDown } = useDraggableScroll(slideRef, {
    direction: 'horizontal',
  });

  const getProductList = useCallback(
    async (id: number) => {
      await findAllProductsMutation.mutateAsync(id, {
        onSuccess: (data) => {
          store.dispatch(setProducts(data));
        },
        onError: (e) => {
          console.log(e);
        },
      });
    },
    [findAllProductsMutation],
  );

  useEffect(() => {
    if (productCode) {
      store.dispatch(initAllProducts());
      getProductList(productCode);
    }
  }, [productCode]);

  return { products, isLoading, slideRef, onMouseDown, onClick };
}

export default useProductList;
