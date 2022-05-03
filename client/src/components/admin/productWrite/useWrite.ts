import { findManuCategory, findTypeCategory } from 'lib/api/category';
import { findOneProduct } from 'lib/api/product';
import { findOneProductUnit } from 'lib/api/products';
import { categorySelector } from 'modules/category/category';
import { CategoryProps } from 'modules/category/props';
import { CategoryData } from 'modules/category/state';
import {
  productSelector,
  setWriteForm,
  unloadWriteForm,
} from 'modules/product/product';
import { selectQuery, unitQuery } from 'modules/product/query';
import { ProductData } from 'modules/products/state';
import { store } from 'modules/store';
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export interface ProductUnitData {
  id: number;
  name: string;
}

export interface SelectProps {
  [index: string]: CategoryProps[];
  manufacture: CategoryProps[];
  type: CategoryProps[];
}

function useWrite() {
  const { productCode } = useSelector(categorySelector);
  const { writeForm } = useSelector(productSelector);
  const manuMutation = useMutation<CategoryData[], Error, number>(
    findManuCategory,
  );
  const typeMutation = useMutation<CategoryData[], Error, number>(
    findTypeCategory,
  );

  const unitMutation = useMutation<ProductUnitData, Error, number>(
    findOneProductUnit,
  );

  const findOneProductMutation = useMutation<ProductData[], Error, number>(
    findOneProduct,
  );

  const [SelectProps, setSelectProps] = useState<SelectProps>();
  const [unit, setUnit] = useState('');
  const [urlDisabled, setUrlDisabled] = useState(true);

  let updateInit = false;

  const { id } = useParams();

  useEffect(() => {
    return () => {
      store.dispatch(unloadWriteForm);
    };
  });

  const setSelectData = useCallback(async (name, list, selectId) => {
    if (updateInit) {
      list.filter((data: any) =>
        data.id === selectId ? (data.check = true) : 0,
      );
      updateInit = false;
    } else {
      list[0].check = true;
      store.dispatch(setWriteForm({ key: name, value: list[0].id }));
    }

    setSelectProps((prev: any) => ({
      ...prev,
      [name]: list,
    }));
  }, []);

  const setFormData = useCallback(async () => {
    const { manufacture, type } = writeForm;
    let result = null;

    result = await unitQuery(productCode, setUnit, unitMutation);
    setUnit(result);

    result = await selectQuery(productCode, manuMutation);
    setSelectData('manufacture', result, manufacture);

    result = await selectQuery(productCode, typeMutation);
    setSelectData('type', result, type);
  }, [writeForm, productCode, unitMutation, manuMutation, typeMutation]);

  useEffect(() => {
    if (productCode !== 0) {
      setFormData();
    }
  }, [productCode]);

  useEffect(() => {
    if (id) {
      updateInit = true;
    }
  }, [id]);

  const selectClick = useCallback(
    (name: string, data: CategoryProps) => {
      if (SelectProps) {
        SelectProps[name].forEach((select: any) =>
          select.id === data.id
            ? (select.check = true)
            : (select.check = false),
        );

        setSelectProps((prev: any) => ({
          ...prev,
          [name]: SelectProps[name],
        }));

        store.dispatch(setWriteForm({ key: name, value: data.name }));
      }
    },
    [SelectProps],
  );

  const textChange = useCallback((e: any) => {
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
    SelectProps,
    unit,
    urlDisabled,
    selectClick,
    textChange,
    urlDisabledClick,
    writeForm,
  };
}

export default useWrite;
