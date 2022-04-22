// PorductData
// {
//   id: 0,
//   code: 0 (대분류 코드),
//   recomment: false (추천상품),
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
  type: string;
  image: string;
  url?: string;
}

export interface ProductState {
  writeForm: ProductData;
}
