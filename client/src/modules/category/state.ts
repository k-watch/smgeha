// CategoryState
// {
//   id: 0,
//   name: '제품 분류명'
//   parent: 0 (상위 분류 id)
// }
export interface CategoryData {
  id: number;
  name: string;
  parent: number;
}

export interface ProductWriteCategoryData {
  manuCategory: CategoryData[];
  typeCategory: CategoryData[];
}

export interface CategoryState {
  productCode: number;
}
