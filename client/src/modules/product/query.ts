import { ProductUnitData } from 'components/admin/productWrite/useWrite';
import { CategoryProps } from 'modules/category/props';
import { CategoryData } from 'modules/category/state';
import { store } from 'modules/store';
import { UseMutationResult } from 'react-query';
import { setWriteForm } from './product';

export const unitQuery = async (
  id: number,
  setData: React.Dispatch<React.SetStateAction<any>>,
  mutation: UseMutationResult<ProductUnitData, Error, number>,
) => {
  let name = '';
  await mutation.mutateAsync(id, {
    onSuccess: (data) => {
      name = data.name;
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return name;
};

export const selectQuery = async (
  id: number,
  mutation: UseMutationResult<CategoryData[], Error, number>,
) => {
  const list: Array<CategoryProps> = [];
  await mutation.mutateAsync(id, {
    onSuccess: (data) => {
      data.forEach((category: CategoryData) => {
        list.push({
          id: Number(category.id),
          name: category.name,
          check: false,
        });
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return list;
};
