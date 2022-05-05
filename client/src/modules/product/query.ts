import { CategoryProps } from 'modules/category/props';
import { CategoryData, ProductWriteCategoryData } from 'modules/category/state';
import { UseMutationResult } from 'react-query';
import { ProductData, ProductUnitData } from './state';

export const productWriteQuery = async (
  id: number,
  mutation: UseMutationResult<ProductData, Error, number>,
) => {
  let result: Partial<ProductData> = {};
  await mutation.mutateAsync(id, {
    onSuccess: (data: ProductData) => {
      result = { ...data };
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return result;
};

export const unitQuery = async (
  id: number,
  mutation: UseMutationResult<ProductUnitData, Error, number>,
) => {
  let unit = '';
  await mutation.mutateAsync(id, {
    onSuccess: (data) => {
      unit = data.name;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return unit;
};

export const selectQuery = async (
  id: number,
  mutation: UseMutationResult<ProductWriteCategoryData, Error, number>,
) => {
  let manuCategory = Array<CategoryProps>();
  let typeCategory = Array<CategoryProps>();

  await mutation.mutateAsync(id, {
    onSuccess: (data) => {
      const initCategory = (category: CategoryData[]) => {
        const list = new Array<CategoryProps>();
        for (const item of category) {
          list.push({
            id: Number(item.id),
            name: item.name,
            check: false,
          });
        }

        return list;
      };

      manuCategory = initCategory(data.manuCategory);
      typeCategory = initCategory(data.typeCategory);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { manuCategory, typeCategory };
};
