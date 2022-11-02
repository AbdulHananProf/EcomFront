import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        allProducts: [],
    },
    reducers: {
        setAllProducts : (state, action) => {
            state.allProducts = action.payload

        },
        // addCategory : (state, action) =>{
        //     state.allCategories = [...state.allCategories, action.payload]
        // },
        // editCategory : (state, action) =>{
        //     const newState = state.allCategories.map(obj => {
        //         // 👇️ if id equals 2, update array values
        //         if (obj._id === action.payload._id) {
        //             return {
        //                 ...obj,
        //                 CategoryImg: action.payload.CategoryImg,
        //                 CategoryMD: action.payload.CategoryMD,
        //                 CategoryMK: action.payload.CategoryMK,
        //                 CategoryName: action.payload.CategoryName,
        //                 CategorySlug: action.payload.CategorySlug,
        //                 CategoryStatus: action.payload.CategoryStatus,
        //             };
        //         }
        //         return obj;
        //     });
        //     state.allCategories = newState
        // },
        // deleteCategoryStore : (state, action) => {
        //     console.log(action.payload)
        //     let singleCategory = state.allCategories.filter(el => {
        //         return el._id !== action.payload;
        //     });
        //     console.log(singleCategory)
        //     state.allCategories = singleCategory
        //
        // }


    },
})

export const {setAllProducts} = productSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProducts = (state) => state.product.allProducts

export default productSlice.reducer
