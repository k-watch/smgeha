import { getHeaderCategory } from 'lib/api/category';
import { CategoryState } from 'modules/category/state';
import { setWriteForm } from 'modules/product/product';
import { store } from 'modules/store';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { CateogryData } from './useWrite';

function useWriteHeader() {
  const categoryQuery = useQuery<CategoryState[], Error>(
    'headerCategory',
    getHeaderCategory,
    {},
  );
  const [productData, setChipData] = useState<CateogryData[]>([]);
  const [recommendDisabled, setRecommendDisabled] = useState(false);

  useEffect(() => {
    if (categoryQuery.data) {
      const categories = categoryQuery.data;
      const list: Array<CateogryData> = [];

      categories.forEach((category) => {
        list.push({ id: category.id, name: category.name, check: false });
      });

      list[0].check = true;

      setChipData([...list]);
      store.dispatch(setWriteForm({ key: 'code', value: Number(list[0].id) }));
    }
  }, [categoryQuery.data]);

  const productClick = useCallback(
    (id: number) => {
      productData.forEach((product) =>
        product.id === id ? (product.check = true) : (product.check = false),
      );

      setChipData([...productData]);
      store.dispatch(setWriteForm({ key: 'code', value: id }));
    },
    [productData],
  );

  const recommendClick = useCallback(() => {
    store.dispatch(
      setWriteForm({ key: 'recommend', value: !recommendDisabled }),
    );
    setRecommendDisabled(!recommendDisabled);
  }, [recommendDisabled]);

  return {
    productClick,
    productData,
    recommendClick,
  };
}

export default useWriteHeader;
