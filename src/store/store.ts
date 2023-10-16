import { createSlice, configureStore } from '@reduxjs/toolkit';
import { FormValues } from '../types';

interface CounterState {
  orders: FormValues[];
}

const initialState: CounterState = {
  orders: []
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, { payload }: { payload: FormValues }) => {
      state.orders = state.orders.concat(payload);
    },
    updateOrders: (state, { payload }: { payload: FormValues[] }) => {
      state.orders = payload;
    }
  }
});

export const { addOrder, updateOrders } = orderSlice.actions;

export const store = configureStore({
  reducer: orderSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
