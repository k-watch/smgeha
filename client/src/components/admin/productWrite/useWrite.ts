import { findProductWirteCategory } from 'lib/api/category';
import { findOneProductUnit, findOneProductWrite } from 'lib/api/product';
import { categorySelector, setProductCode } from 'modules/category/category';
import { CategoryProps } from 'modules/category/props';
import { ProductWriteCategoryData } from 'modules/category/state';
import {
  productSelector,
  setLoadImage,
  setWriteForm,
  unloadWriteForm,
} from 'modules/product/product';
import { SelectProps } from 'modules/product/props';
import {
  productWriteQuery,
  selectQuery,
  unitQuery,
} from 'modules/product/query';
import { ProductUnitData } from 'modules/product/state';
import { ProductData } from 'modules/product/state';
import { store } from 'modules/store';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// 제품 수정 ENUM
enum UPDATE {
  NONE = 0,
  START,
  END,
}

function useWrite() {
  const { id } = useParams();

  const { productCode } = useSelector(categorySelector);
  const { writeForm } = useSelector(productSelector);

  const productWriteMutation = useMutation<ProductData, Error, number>(
    findOneProductWrite,
  );
  const unitMutation = useMutation<ProductUnitData, Error, number>(
    findOneProductUnit,
  );
  const categoryMutation = useMutation<ProductWriteCategoryData, Error, number>(
    findProductWirteCategory,
  );

  // 제품 수정 State
  const [updateInit, setUpdateInit] = useState(UPDATE.START);
  const [SelectProps, setSelectProps] = useState<SelectProps>();
  const [unit, setUnit] = useState('');
  const [urlDisabled, setUrlDisabled] = useState(true);

  useEffect(() => {
    return () => {
      store.dispatch(unloadWriteForm());
    };
  }, []);

  const setSelectData = useCallback(async (name, category, selectId) => {
    // 헤더 버튼을 클릭했을 때
    if (selectId === 0) {
      category[0].check = true;
      store.dispatch(setWriteForm({ key: name, value: category[0].id }));
    } else {
      // 제품을 수정할 때
      for (const data of category) {
        if (data.id === selectId) {
          data.check = true;
          break;
        }
      }
      setUpdateInit(UPDATE.NONE);
    }

    setSelectProps((prev: any) => ({
      ...prev,
      [name]: category,
    }));
  }, []);

  // init
  // 헤더 버튼 클릭: true
  // 제품 수정: false
  const initFormData = useCallback(
    async (init: boolean) => {
      const { manufacture, type, url } = writeForm;

      const unit = await unitQuery(productCode, unitMutation);
      setUnit(unit.name);

      const { manuCategory, typeCategory } = await selectQuery(
        productCode,
        categoryMutation,
      );

      setSelectData('manufacture', manuCategory, init ? 0 : manufacture);
      setSelectData('type', typeCategory, init ? 0 : type);

      if (url) {
        setUrlDisabled(false);
      }
    },
    [writeForm, productCode, unitMutation, categoryMutation, setSelectData],
  );

  useEffect(() => {
    // 제품 정보를 모두 읽어오면 폼 데이터를 초기화
    if (updateInit === UPDATE.END) {
      initFormData(false);
    }
  }, [updateInit]);

  // 제품 정보 로드
  const findProduct = useCallback(async () => {
    try {
      let { product, productImgInfo } = await productWriteQuery(
        Number(id),
        productWriteMutation,
      );

      Object.keys(product).forEach((name) => {
        if (name !== 'image') {
          store.dispatch(setWriteForm({ key: name, value: product[name] }));
        }
      });

      let imageList = [];
      if (productImgInfo) {
        for (const image of productImgInfo) {
          imageList.push(image.name);
        }
      }
      store.dispatch(setLoadImage(imageList));
      store.dispatch(setProductCode(product.code));

      setUpdateInit(UPDATE.END);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (id) {
      // 제품 수정
      findProduct();
    } else if (!id) {
      // 제품 등록
      setUpdateInit(UPDATE.NONE);
    }
  }, [id]);

  useEffect(() => {
    // 제품 등록
    if (productCode && updateInit === UPDATE.NONE) {
      store.dispatch(unloadWriteForm());
      initFormData(true);
    }
  }, [productCode]);

  useEffect(() => {
    // 제품 등록
    if (!id && updateInit === UPDATE.NONE) {
      store.dispatch(unloadWriteForm());
      initFormData(true);
    }
  }, [updateInit]);

  const selectClick = useCallback(
    (name: string, category: CategoryProps) => {
      if (SelectProps) {
        for (const select of SelectProps[name]) {
          select.id === category.id
            ? (select.check = true)
            : (select.check = false);
        }

        setSelectProps((prev: any) => ({
          ...prev,
          [name]: SelectProps[name],
        }));

        store.dispatch(setWriteForm({ key: name, value: category.id }));
      }
    },
    [SelectProps],
  );

  const textChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    store.dispatch(setWriteForm({ key: name, value }));
  }, []);

  const urlDisabledClick = useCallback(() => {
    setUrlDisabled(!urlDisabled);

    if (!urlDisabled) {
      store.dispatch(setWriteForm({ key: 'url', value: '' }));
    }
  }, [urlDisabled]);

  return {
    writeForm,
    SelectProps,
    unit,
    urlDisabled,
    selectClick,
    textChange,
    urlDisabledClick,
  };
}

export default useWrite;
