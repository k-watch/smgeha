// PorductData
// {
//   id: 0,
//   code: 0 (대분류 코드),
//   name: '제품명',
//   manufacture: '제조사',
//   size: '크기',
//   type: 0,
//   image: 'image.png',
//   url: 'url.com'
// }
export interface ProductsData {
  [index: string]: any;
  id: number;
  recommend: number;
  code: number;
  name: string;
  manufacture: string;
  size: string;
  type: number;
  image: string;
  url?: string;
  unit: string;
}

export interface ProductsState {
  products: Array<ProductsData>;
  recommendProducts: Array<ProductsData>;
}
