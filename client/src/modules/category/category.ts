import { createSlice } from '@reduxjs/toolkit';
import { CategoryState } from './state';

const initialState: CategoryState = {
  productCode: 0,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setProductCode(state, { payload: code }) {
      state.productCode = code;
    },
  },
});

export const { setProductCode } = categorySlice.actions;

export const categorySelector = (state: any) => state.category as CategoryState;

export default categorySlice.reducer;
