import {
  CateogryData,
  ProductUnitData,
} from 'components/productWrite/useWrite';
import { CategoryState } from 'modules/category/state';
import { store } from 'modules/store';
import { UseMutationResult } from 'react-query';
import { setWriteForm } from './product';

export const unitQuery = async (
  id: number,
  setData: React.Dispatch<React.SetStateAction<any>>,
  mutation: UseMutationResult<ProductUnitData, Error, number>,
) => {
  await mutation.mutateAsync(id, {
    onSuccess: (data) => {
      setData(data.name);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const selectQuery = async (
  id: number,
  name: string,
  setCode: number | string,
  setData: React.Dispatch<React.SetStateAction<any>>,
  mutation: UseMutationResult<CategoryState[], Error, number>,
) => {
  await mutation.mutateAsync(id, {
    onSuccess: (data) => {
      const list: Array<CateogryData> = [];

      data.forEach((category: CategoryState) => {
        list.push({
          id: category.id,
          name: category.name,
          check: false,
        });
      });

      if (!setCode) {
        debugger;
        name === 'manufacture'
          ? store.dispatch(setWriteForm({ key: name, value: list[0].name }))
          : store.dispatch(setWriteForm({ key: name, value: list[0].id }));
        list[0].check = true;
      } else {
        for (const l of list) {
          if (name === 'manufacture' && l.name === setCode) {
            l.check = true;
          } else if (name === 'type' && Number(l.id) === setCode) {
            l.check = true;
          }
        }

        debugger;
      }

      setData((prev: any) => ({
        ...prev,
        [name]: list,
      }));
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
