import { createSlice } from '@reduxjs/toolkit'

export const fabricSlice = createSlice({
    name: 'fabric',
    initialState: {
        allFabrics: [],
        edit:[]
    },
    reducers: {
        setAllFabrics : (state, action) => {
           state.allFabrics = action.payload

       },
       addFabric : (state, action) =>{
            state.allFabrics = [...state.allFabrics, action.payload]
        },
        editFabric : (state, action) =>{
            const newState = state.allFabrics.map(obj => {
                // 👇️ if id equals 2, update array values
                if (obj._id === action.payload._id) {
                    return {
                        ...obj,
                        FabricImg: action.payload.FabricImg,
                        FabricMD: action.payload.FabricMD,
                        FabricMK: action.payload.FabricMK,
                        FabricName: action.payload.FabricName,
                        FabricSlug: action.payload.FabricSlug,
                        FabricStatus: action.payload.FabricStatus,
                        type: action.payload.type,
                    };
                }
                return obj;
            });
            state.allFabrics = newState
       },
        deleteFabricStore : (state, action) => {
            let singleFabric = state.allFabrics.filter(el => {
                return el._id !== action.payload;
            });
            state.allFabrics = singleFabric

        }


    },
})

export const { setAllFabrics,addFabric, editFabric,deleteFabricStore } = fabricSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectFabrics = (state) => state.fabric.allFabrics

export default fabricSlice.reducer
