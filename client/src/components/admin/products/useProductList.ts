import { findAllProducts } from 'lib/api/products';
import { ProductData } from 'modules/products/state';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import useDraggableScroll from 'use-draggable-scroll';

function useProductList() {
  const listMutation = useMutation<ProductData[], Error, number>(
    findAllProducts,
  );

  const slideRef = useRef(null);

  const { onMouseDown } = useDraggableScroll(slideRef, {
    direction: 'horizontal',
  });

  const getList = async () => {
    await listMutation.mutateAsync(1, {
      onSuccess: (data) => {},
      onError: (e) => {
        console.log(e);
      },
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return { listMutation, slideRef, onMouseDown };
}

export default useProductList;
