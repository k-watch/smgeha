import {
  findManuCategory,
  findTypeCategory,
  getHeaderCategory,
} from 'lib/api/category';
import { CategoryState } from 'modules/category/state';
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

  const manuCategiryMutation = useMutation<CategoryState[], Error, number>(
    findManuCategory,
  );

  const typeCategiryMutation = useMutation<CategoryState[], Error, number>(
    findTypeCategory,
  );

  const [chipData, setChipData] = useState<CateogryData[]>([]);
  const [typeSelectData, setTypeSelectData] = useState<CateogryData[]>([]);
  const [manuSelectData, setManuSelectData] = useState<CateogryData[]>([]);

  const onClick = useCallback((code: number) => {}, []);

  const manuCategory = useCallback(
    (id: number) => {
      manuCategiryMutation.mutateAsync(id, {
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
    [manuCategiryMutation],
  );

  const typeCategory = useCallback(
    (id: number) => {
      typeCategiryMutation.mutateAsync(id, {
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
    [typeCategiryMutation],
  );

  const initCatgory = () => {};

  useEffect(() => {
    productCategoryQuery.refetch();
    if (productCategoryQuery.data) {
      const id = productCategoryQuery.data[0].id;
      manuCategory(id);
      typeCategory(id);
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

  const handleClick = useCallback(
    (id: number) => {
      chipData.forEach((chip) =>
        chip.id === id ? (chip.check = true) : (chip.check = false),
      );

      setChipData([...chipData]);
      manuCategory(id);
      typeCategory(id);
    },
    [chipData, manuCategory, typeCategory],
  );

  return { handleClick, chipData, typeSelectData, manuSelectData, onClick };
}

export default useWrite;
