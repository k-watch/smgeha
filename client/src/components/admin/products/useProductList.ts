import { findAllProducts } from 'lib/api/products';
import { ProductsData, ProductsState } from 'modules/products/state';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useDraggableScroll from 'use-draggable-scroll';
import { useSelector } from 'react-redux';
import { remove } from 'lib/api/product';
import { categorySelector } from 'modules/category/category';

function useProductList() {
  const { productCode } = useSelector(categorySelector);

  const listMutation = useMutation<ProductsState, Error, number>(
    findAllProducts,
  );

  const slideRef = useRef(null);

  const { onMouseDown } = useDraggableScroll(slideRef, {
    direction: 'horizontal',
  });

  const [removeLodingOpen, setRemoveLodingOpen] = useState(false);
  const [removeSuccessOpen, setRemoveSuccessOpen] = useState(false);
  const [productInfo, setPorductInfo] = useState<ProductsData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (productInfo) {
      const { id } = productInfo;
      navigate(`/admin/write/${id}`);
    }
  }, [productInfo]);

  const removeSuccessClose = () => {
    setRemoveSuccessOpen(false);
  };

  const getList = async (id: number) => {
    await listMutation.mutateAsync(id, {
      onSuccess: (data) => {},
      onError: (e) => {
        console.log(e);
      },
    });
  };

  const onRemove = async (id: number) => {
    try {
      setRemoveLodingOpen(true);
      await remove(id);
      setRemoveSuccessOpen(true);
      const { data } = listMutation;
      if (data) {
        for (let i = 0; i < data.products.length; i++) {
          if (data.products[i].id === id) {
            data.products.splice(i, 1);
            break;
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    setRemoveLodingOpen(false);
  };

  useEffect(() => {
    if (productCode !== 0) {
      getList(productCode);
    }
  }, [productCode]);

  return {
    listMutation,
    slideRef,
    onMouseDown,
    onRemove,
    removeLodingOpen,
    removeSuccessClose,
    removeSuccessOpen,
    setPorductInfo,
  };
}

export default useProductList;
