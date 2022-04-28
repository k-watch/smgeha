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
    image: [],
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
    unloadWriteForm(state) {
      return initialState;
    },
  },
});

export const { setWriteForm, unloadWriteForm } = productSlice.actions;

export const productSelector = (state: any) => state.product as ProductState;

export default productSlice.reducer;
