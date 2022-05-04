import { CategoryProps } from 'modules/category/props';

export interface SelectProps {
  [index: string]: CategoryProps[];
  manufacture: CategoryProps[];
  type: CategoryProps[];
}
