import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        allCategories: [],
        edit:[]
    },
    reducers: {
       setAllCategory : (state, action) => {
           state.allCategories = action.payload

       },
        addCategory : (state, action) =>{
            state.allCategories = [...state.allCategories, action.payload]
        },
        editCategory : (state, action) =>{
            const newState = state.allCategories.map(obj => {
                // 👇️ if id equals 2, update array values
                if (obj._id === action.payload._id) {
                    return {
                        ...obj,
                        CategoryImg: action.payload.CategoryImg,
                        CategoryMD: action.payload.CategoryMD,
                        CategoryMK: action.payload.CategoryMK,
                        CategoryName: action.payload.CategoryName,
                        CategorySlug: action.payload.CategorySlug,
                        CategoryStatus: action.payload.CategoryStatus,
                        type: action.payload.type,
                    };
                }
                return obj;
            });
            state.allCategories = newState
       },
        deleteCategoryStore : (state, action) => {
            console.log(action.payload)
            let singleCategory = state.allCategories.filter(el => {
                return el._id !== action.payload;
            });
            console.log(singleCategory)
            state.allCategories = singleCategory

        }


    },
})

export const { setAllCategory,addCategory, editCategory,deleteCategoryStore } = categorySlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCategories = (state) => state.category.allCategories

export default categorySlice.reducer
