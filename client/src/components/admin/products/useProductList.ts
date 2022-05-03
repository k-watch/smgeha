import { findAllProducts, remove } from 'lib/api/products';
import { ProductData } from 'modules/products/state';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useDraggableScroll from 'use-draggable-scroll';
import { setWriteForm } from 'modules/product/product';
import { useSelector } from 'react-redux';
import { findOneProduct } from 'lib/api/product';
import { store } from 'modules/store';
import { categorySelector } from 'modules/category/category';

function useProductList() {
  const { productCode } = useSelector(categorySelector);

  const listMutation = useMutation<ProductData[], Error, number>(
    findAllProducts,
  );
  const removeMutation = useMutation<any, Error, number>(remove);

  const slideRef = useRef(null);

  const { onMouseDown } = useDraggableScroll(slideRef, {
    direction: 'horizontal',
  });

  const [removeLodingOpen, setRemoveLodingOpen] = useState(false);
  const [removeSuccessOpen, setRemoveSuccessOpen] = useState(false);
  const [productInfo, setPorductInfo] = useState<ProductData>();
  const navigate = useNavigate();

  const findOneProductMutation = useMutation<ProductData[], Error, number>(
    findOneProduct,
  );

  const test = async (id: number) => {
    await findOneProductMutation.mutateAsync(id, {
      onSuccess: (data: any) => {
        Object.keys(data.product).forEach((d) => {
          store.dispatch(setWriteForm({ key: d, value: data.product[d] }));
        });
        navigate(`/write/${id}`);
      },
      onError: (e: any) => {
        console.log(e);
      },
    });
  };

  useEffect(() => {
    if (productInfo) {
      const { id } = productInfo;
      test(id);
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
    await removeMutation.mutateAsync(0, {
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
