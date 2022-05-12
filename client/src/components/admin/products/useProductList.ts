import { findAllProducts } from 'lib/api/products';
import { ProductsData } from 'modules/products/state';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useDraggableScroll from 'use-draggable-scroll';
import { setWriteForm } from 'modules/product/product';
import { useSelector } from 'react-redux';
import { findOneProduct, findOneProductWrite, remove } from 'lib/api/product';
import { store } from 'modules/store';
import { categorySelector } from 'modules/category/category';

function useProductList() {
  const { productCode } = useSelector(categorySelector);

  const listMutation = useMutation<ProductsData[], Error, number>(
    findAllProducts,
  );
  const removeMutation = useMutation<any, Error, number>(remove);

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
      navigate(`/write/${id}`);
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
    setRemoveLodingOpen(true);
    await removeMutation.mutateAsync(id, {
      onSuccess: (data) => {
        getList(productCode);
        setRemoveSuccessOpen(true);
        setRemoveLodingOpen(false);
      },
      onError: (e) => {
        console.log(e);
        setRemoveLodingOpen(false);
      },
    });
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
