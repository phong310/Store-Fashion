import { createSlice } from '@reduxjs/toolkit'

const increaseCartSlice = createSlice({
    name: "increase",
    initialState: {
        increaseCart: {
            itemIncrease: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // INCREASE ITEM
        increaseItemStart: (state) => {
            state.increaseCart.isFetching = true;
        },
        increaseItemSuccess: (state, actions) => {
            state.increaseCart.isFetching = false;
            state.increaseCart.itemIncrease = actions.payload;
            state.increaseCart.error = false;
        },
        increaseItemFailed: (state) => {
            state.increaseCart.isFetching = false;
            state.increaseCart.error = true
        },

    }
})

export const { increaseItemStart, increaseItemSuccess, increaseItemFailed } = increaseCartSlice.actions;
export default increaseCartSlice.reducer