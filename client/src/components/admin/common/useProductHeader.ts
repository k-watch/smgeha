import { getHeaderCategory } from 'lib/api/category';
import { categorySelector, setProductCode } from 'modules/category/category';
import { CategoryProps } from 'modules/category/props';
import { CategoryData } from 'modules/category/state';
import { productSelector, setWriteForm } from 'modules/product/product';
import { store } from 'modules/store';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function useWriteHeader() {
  const { productCode } = useSelector(categorySelector);
  const { writeForm } = useSelector(productSelector);

  const categoryQuery = useQuery<CategoryData[], Error>(
    'headerCategory',
    getHeaderCategory,
    {},
  );
  const [productCategory, setProductCategory] = useState<CategoryProps[]>([]);
  const [recommendDisabled, setRecommendDisabled] = useState(false);

  // 외부에서 헤더를 건드릴 때 (제품 수정을 위해 정보 로드)
  useEffect(() => {
    productClick(productCode);
    setRecommendDisabled(writeForm.recommend);
  }, [productCode, writeForm.recommend]);

  useEffect(() => {
    if (categoryQuery.data) {
      const categories = categoryQuery.data;
      const tempList: Array<CategoryProps> = [];

      categories.forEach((category) => {
        tempList.push({
          id: Number(category.id),
          name: category.name,
          check: false,
        });
      });

      tempList[0].check = true;

      setProductCategory([...tempList]);
      store.dispatch(setProductCode(tempList[0].id));
    }
  }, [categoryQuery.data]);

  const productClick = useCallback(
    (id: number) => {
      for (const product of productCategory) {
        product.id === id ? (product.check = true) : (product.check = false);
      }

      setProductCategory([...productCategory]);
      store.dispatch(setProductCode(id));
    },
    [productCategory],
  );

  const recommendClick = useCallback(() => {
    store.dispatch(
      setWriteForm({ key: 'recommend', value: !recommendDisabled }),
    );
    setRecommendDisabled(!recommendDisabled);
  }, [recommendDisabled]);

  return {
    productCategory,
    productClick,
    recommendDisabled,
    recommendClick,
  };
}

export default useWriteHeader;
