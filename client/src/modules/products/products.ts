import { createSlice } from '@reduxjs/toolkit';
import { ProductsState } from './state';

const initialState: ProductsState = {
  products: [],
  recommendProducts: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    initAllProducts(state) {
      return initialState;
    },
    initProducts(state) {
      state.products = [];
    },
    setProducts(state, { payload: data }) {
      state.products = data.products;
      state.recommendProducts = data.recommendProducts;
    },
    setSearchProducts(state, { payload: products }) {
      state.products = products;
    },
  },
});

export const { initAllProducts, initProducts, setProducts, setSearchProducts } =
  productsSlice.actions;

export const productsSelector = (state: any) => state.products as ProductsState;

export default productsSlice.reducer;
