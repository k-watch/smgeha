import { findAllProducts, remove } from 'lib/api/products';
import { ProductData } from 'modules/products/state';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useDraggableScroll from 'use-draggable-scroll';
import qs from 'qs';
import { productSelector, setWriteForm } from 'modules/product/product';
import { useSelector } from 'react-redux';
import { findOneProduct } from 'lib/api/product';
import { store } from 'modules/store';

function useProductList() {
  const { writeForm } = useSelector(productSelector);

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

  const onRemove = async (id: number) => {
    setRemoveLodingOpen(true);
    await removeMutation.mutateAsync(0, {
      onSuccess: (data) => {
        getList();
        setRemoveSuccessOpen(true);
        setRemoveLodingOpen(false);
      },
      onError: (e) => {
        console.log(e);
        setRemoveLodingOpen(false);
      },
    });
  };

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
