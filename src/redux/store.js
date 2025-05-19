import {configureStore} from '@reduxjs/toolkit';
//import productReducer from '../redux/slices/productSlice';
import postsReducer from '../redux/slices/postsSlice';
import cartReducer from '../redux/slices/cartSlice ';
const store = configureStore({
  reducer: {
    posts: postsReducer,
    cart: cartReducer,
  },
});

export default store;
