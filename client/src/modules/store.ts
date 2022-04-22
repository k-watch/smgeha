import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import productReducer from './product/product';

export const store = configureStore({
  reducer: { auth: authReducer, product: productReducer },
});
