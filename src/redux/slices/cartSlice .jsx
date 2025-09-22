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
  },
});

export const {addCart} = cartSlice.actions;
export default cartSlice.reducer;
