import { createSlice } from '@reduxjs/toolkit';
import { ProductsState } from './state';

const initialState: ProductsState = {
  list: [],
  recommendList: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, { payload: products }) {
      state.list = products;
      state.recommendList = products.filter((p: any) => p.recommend === 1);
    },
    setSearchProducts(state, { payload: products }) {
      state.list = products;
    },
  },
});

export const { setProducts, setSearchProducts } = productsSlice.actions;

export const productsSelector = (state: any) => state.products as ProductsState;

export default productsSlice.reducer;
