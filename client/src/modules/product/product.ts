import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from './state';

const initialState: ProductState = {
  writeForm: {
    id: 0,
    recommend: false,
    code: 0,
    name: '',
    manufacture: 0,
    size: 0,
    type: 0,
    image: [],
    url: '',
    content: '',
  },
  loadImage: [],
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
    setLoadImage(state, action) {
      state.loadImage = [...action.payload];
    },
  },
});

export const { setWriteForm, unloadWriteForm, setLoadImage } =
  productSlice.actions;

export const productSelector = (state: any) => state.product as ProductState;

export default productSlice.reducer;
