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
export interface ProductData {
  [index: string]: any;
  id: number;
  recommend: boolean;
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
  list: Array<ProductData>;
}
