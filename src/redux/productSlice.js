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
        addProduct : (state, action) =>{
            state.allProducts = [...state.allProducts, action.payload]
        },
        editProduct : (state, action) =>{
            const newState = state.allProducts.map(obj => {
                // 👇️ if id equals 2, update array values
                if (obj._id === action.payload._id) {
                    return {
                        ...obj,
                        ProductName:action.payload.ProductName,
                        ProductCategory:{_id:action.payload.ProductCategory._id,CategoryName:action.payload.ProductCategory.CategoryName},
                        ProductSlug:action.payload.ProductSlug,
                        ProductMK:action.payload.ProductMK,
                        ProductMD:action.payload.ProductMD,
                        ProductPrice:action.payload.ProductPrice,
                        ProductWeight:action.payload.ProductWeight,
                        ProductQuantity:action.payload.ProductQuantity,
                        ProductDescription:action.payload.ProductDescription,
                        ProductStatus:action.payload.ProductStatus,
                        ProductShowOnHome:action.payload.ProductShowOnHome,
                        ProductThumbnail:action.payload.ProductThumbnail,
                        ProductImage1:action.payload.ProductImage1,
                        ProductImage2:action.payload.ProductImage2,
                        ProductImage3:action.payload.ProductImage3,
                        ProductImage4:action.payload.ProductImage4,
                    };
                }
                return obj;
            });
            state.allProducts = newState
        },
        deleteProductRedx : (state, action) => {
            console.log(action.payload)
            let singleProduct = state.allProducts.filter(el => {
                return el._id !== action.payload;
            });
            console.log(singleProduct)
            state.allProducts = singleProduct

        }


    },
})

export const {setAllProducts, addProduct,editProduct,deleteProductRedx} = productSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProducts = (state) => state.product.allProducts

export default productSlice.reducer
