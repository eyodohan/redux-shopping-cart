import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer  from '../features/product/productsSlice';
import cartSlice from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
