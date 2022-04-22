import { createSlice } from '@reduxjs/toolkit';
import { ProductsState } from './state';

const initialState: ProductsState = {
  list: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, { payload: products }) {
      state.list = products;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export const productsSelector = (state: any) => state.products;

export default productsSlice.reducer;
