import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import productReducer from './product/product';
import categoryReducer from './category/category';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
