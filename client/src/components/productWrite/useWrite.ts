import { findManuCategory, findTypeCategory } from 'lib/api/category';
import { findOneProduct } from 'lib/api/product';
import { findOneProductUnit } from 'lib/api/products';
import { CategoryState } from 'modules/category/state';
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

export interface CateogryData {
  id: number;
  name: string;
  check: boolean;
}

export interface ProductUnitData {
  id: number;
  name: string;
}

export interface SelectData {
  [index: string]: CateogryData[];
  manufacture: CateogryData[];
  type: CateogryData[];
}

function useWrite() {
  const { writeForm } = useSelector(productSelector);
  const manuMutation = useMutation<CategoryState[], Error, number>(
    findManuCategory,
  );
  const typeMutation = useMutation<CategoryState[], Error, number>(
    findTypeCategory,
  );

  const unitMutation = useMutation<ProductUnitData, Error, number>(
    findOneProductUnit,
  );

  const findOneProductMutation = useMutation<ProductData[], Error, number>(
    findOneProduct,
  );

  const [selectData, setSelectData] = useState<SelectData>();
  const [unit, setUnit] = useState('');
  const [urlDisabled, setUrlDisabled] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    return () => {
      store.dispatch(unloadWriteForm);
    };
  });

  const setFormData = useCallback(
    (id: number) => {
      unitQuery(id, setUnit, unitMutation);
      selectQuery(
        id,
        'manufacture',
        writeForm.manufacture,
        setSelectData,
        manuMutation,
      );
      selectQuery(id, 'type', writeForm.type, setSelectData, typeMutation);
    },
    [unitMutation, manuMutation, typeMutation],
  );

  useEffect(() => {
    if (writeForm.code !== 0) {
      setFormData(writeForm.code);
    }
  }, [writeForm.code]);

  const selectClick = useCallback(
    (name: string, data: CateogryData) => {
      if (selectData) {
        selectData[name].forEach((select: any) =>
          select.id === data.id
            ? (select.check = true)
            : (select.check = false),
        );

        setSelectData((prev: any) => ({
          ...prev,
          [name]: selectData[name],
        }));

        store.dispatch(setWriteForm({ key: name, value: data.name }));
      }
    },
    [selectData],
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
    selectData,
    unit,
    urlDisabled,
    selectClick,
    textChange,
    urlDisabledClick,
    writeForm,
  };
}

export default useWrite;
