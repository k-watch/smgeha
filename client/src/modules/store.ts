import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import categoryReducer from './category/category';
import productsReducer from './products/products';
import productReducer from './product/product';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    products: productsReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
