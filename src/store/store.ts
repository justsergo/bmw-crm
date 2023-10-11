import { createSlice, configureStore } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: []
  },
  reducers: {
    addOrder: (state, { payload }) => {
      state.orders = state.orders.concat(payload);
      console.log('addOrder', state.orders);
    }
  }
});

export const { addOrder } = orderSlice.actions;

export const store = configureStore({
  reducer: orderSlice.reducer
});
