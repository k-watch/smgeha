import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from './state';

const initialState: ProductState = {
  writeForm: {
    id: 0,
    recommend: false,
    code: 0,
    name: '',
    manufacture: '',
    size: '',
    type: '',
    image: '',
    url: '',
  },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setWriteForm(state, { payload: { key, value } }) {
      state.writeForm[key] = value;
    },
  },
});

export const { setWriteForm } = productSlice.actions;

export const productSelector = (state: any) => state.product;

export default productSlice.reducer;
