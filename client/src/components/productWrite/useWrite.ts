import {
  findManuCategory,
  findTypeCategory,
  getHeaderCategory,
} from 'lib/api/category';
import { CategoryState } from 'modules/category/state';
import { setWriteForm } from 'modules/product/product';
import { setProducts } from 'modules/products/products';
import { store } from 'modules/store';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

export interface CateogryData {
  id: number;
  name: string;
  check: boolean;
}

function useWrite() {
  const productCategoryQuery = useQuery<CategoryState[], Error>(
    'headerCategory',
    getHeaderCategory,
    {
      enabled: false,
    },
  );

  const manuMutation = useMutation<CategoryState[], Error, number>(
    findManuCategory,
  );

  const typeMutation = useMutation<CategoryState[], Error, number>(
    findTypeCategory,
  );

  const [productData, setChipData] = useState<CateogryData[]>([]);
  const [typeSelectData, setTypeSelectData] = useState<CateogryData[]>([]);
  const [manuSelectData, setManuSelectData] = useState<CateogryData[]>([]);
  const [urlDisabled, setUrlDisabled] = useState(true);
  const [recommendDisabled, setRecommendDisabled] = useState(false);

  const onClick = useCallback((code: number) => {}, []);

  const manuSelect = useCallback(
    (id: number) => {
      manuMutation.mutateAsync(id, {
        onSuccess: (data) => {
          const chipList: Array<CateogryData> = [];
          data.forEach((category) => {
            chipList.push({
              id: category.id,
              name: category.name,
              check: false,
            });
          });
          setManuSelectData(chipList);
        },
        onError: (error) => {},
      });
    },
    [manuMutation],
  );

  const typeSelect = useCallback(
    (id: number) => {
      typeMutation.mutateAsync(id, {
        onSuccess: (data) => {
          const chipList: Array<CateogryData> = [];
          data.forEach((category) => {
            chipList.push({
              id: category.id,
              name: category.name,
              check: false,
            });
          });
          setTypeSelectData(chipList);
        },
        onError: (error) => {},
      });
    },
    [typeMutation],
  );

  const initCatgory = () => {};

  useEffect(() => {
    productCategoryQuery.refetch();
    if (productCategoryQuery.data) {
      const id = productCategoryQuery.data[0].id;
      manuSelect(id);
      typeSelect(id);
    }
  }, [productCategoryQuery.data]);

  useEffect(() => {
    const categories = productCategoryQuery.data;
    if (categories) {
      const chipList: Array<CateogryData> = [];
      categories.forEach((category) => {
        chipList.push({ id: category.id, name: category.name, check: false });
      });
      setChipData(chipList);
    }
  }, [productCategoryQuery.data]);

  const productHandleClick = useCallback(
    (id: number) => {
      store.dispatch(setWriteForm({ key: 'code', value: id }));
      productData.forEach((product) =>
        product.id === id ? (product.check = true) : (product.check = false),
      );

      setChipData([...productData]);
      manuSelect(id);
      typeSelect(id);
    },
    [productData, manuSelect, typeSelect],
  );

  const recommendHandleClick = useCallback(() => {
    store.dispatch(
      setWriteForm({ key: 'recommend', value: !recommendDisabled }),
    );
    setRecommendDisabled(!recommendDisabled);
  }, [recommendDisabled]);

  return {
    productHandleClick,
    productData,
    typeSelectData,
    manuSelectData,
    urlDisabled,
    setUrlDisabled,
    recommendHandleClick,
    onClick,
  };
}

export default useWrite;
