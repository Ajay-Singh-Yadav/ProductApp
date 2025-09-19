import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(items => items.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({...product, quantity: 1});
      }
    },
    removeCart: (state, action) => {
      state.items = state.items.filter(items => items.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {addCart, removeCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
