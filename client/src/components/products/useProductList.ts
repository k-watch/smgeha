import { findAllProducts } from 'lib/api/products';
import { categorySelector } from 'modules/category/category';
import { productsSelector, setProducts } from 'modules/products/products';
import { ProductsData } from 'modules/products/state';
import { store } from 'modules/store';
import { useCallback, useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import useDraggableScroll from 'use-draggable-scroll';

function useProductList() {
  const { productCode } = useSelector(categorySelector);
  const { list } = useSelector(productsSelector);

  const findAllProductsMutation = useMutation<ProductsData[], Error, number>(
    findAllProducts,
  );
  const { isLoading } = findAllProductsMutation;

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
      getProductList(productCode);
    }
  }, [productCode]);

  return { list, isLoading, slideRef, onMouseDown };
}

export default useProductList;
