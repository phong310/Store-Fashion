import { createSlice } from '@reduxjs/toolkit'

const decreaseCartSlice = createSlice({
    name: "decrease",
    initialState: {
        decreaseCart: {
            itemDecrease: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // DEACREASE ITEM CART
        decreaseItemStart: (state) => {
            state.decreaseCart.isFetching = true;
        },
        decreaseItemSuccess: (state, actions) => {
            state.decreaseCart.isFetching = false;
            state.decreaseCart.itemDecrease = actions.payload;
            state.decreaseCart.error = false;
        },
        decreaseItemFaild: (state) => {
            state.decreaseCart.isFetching = false;
            state.decreaseCart.error = true
        }

    }
})

export const { decreaseItemStart, decreaseItemSuccess, decreaseItemFaild } = decreaseCartSlice.actions;
export default decreaseCartSlice.reducer