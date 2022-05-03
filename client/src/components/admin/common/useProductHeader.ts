import { getHeaderCategory } from 'lib/api/category';
import { categorySelector, setProductCode } from 'modules/category/category';
import { CategoryProps } from 'modules/category/props';
import { CategoryData } from 'modules/category/state';
import { setWriteForm } from 'modules/product/product';
import { store } from 'modules/store';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function useWriteHeader() {
  const { productCode } = useSelector(categorySelector);
  const categoryQuery = useQuery<CategoryData[], Error>(
    'headerCategory',
    getHeaderCategory,
    {},
  );
  const [productData, setChipData] = useState<CategoryProps[]>([]);
  const [recommendDisabled, setRecommendDisabled] = useState(false);
  let updateInit = false;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      updateInit = true;
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      productData.forEach((product) =>
        Number(product.id) === productCode
          ? (product.check = true)
          : (product.check = false),
      );

      setChipData([...productData]);
    }
  }, [productCode]);

  useEffect(() => {
    debugger;
    if (categoryQuery.data) {
      const categories = categoryQuery.data;
      const list: Array<CategoryProps> = [];

      categories.forEach((category) => {
        list.push({
          id: Number(category.id),
          name: category.name,
          check: false,
        });
      });

      if (updateInit) {
        list.filter((data: any) => (data.id === id ? (data.check = true) : 0));
        updateInit = false;
      } else {
        list[0].check = true;
      }

      setChipData([...list]);
      store.dispatch(setProductCode(list[0].id));
    }
  }, [categoryQuery.data]);

  const productClick = useCallback(
    (id: number) => {
      productData.forEach((product) =>
        product.id === id ? (product.check = true) : (product.check = false),
      );

      setChipData([...productData]);
      store.dispatch(setProductCode(id));
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
