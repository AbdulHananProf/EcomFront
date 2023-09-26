import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import fabricReducer from './fabricSlice'

export default configureStore({
    reducer: {
        category: categoryReducer,
        fabric:fabricReducer,
        product: productReducer,
    },
});
