import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (skip = 0) => {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=30&skip=${skip}`,
    );
    return {data: response.data.products, skip};
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    skip: 0,
    hasMore: true,
  },
  reducers: {
    resetProducts: state => {
      state.items = [];
      state.skip = 0;
      state.hasMore = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const newItems = action.payload.data;
        state.items = [...state.items, ...newItems];
        state.skip += 30;
        state.hasMore = newItems.length === 30;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
      });
  },
});

export const {resetProducts} = productSlice.actions;
export default productSlice.reducer;
