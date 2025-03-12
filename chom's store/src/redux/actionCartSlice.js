import { createSlice } from '@reduxjs/toolkit'

const actionCartSlice = createSlice({
    name: "action",
    initialState: {
        addToCart: {
            itemCart: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // ADD ITEM CART
        addTocartStart: (state) => {
            state.addToCart.isFetching = true;
        },

        addToCartSuccess: (state, actions) => {
            state.addToCart.isFetching = false;
            state.addToCart.itemCart = actions.payload;
            state.addToCart.error = false;
        },
        addToCartFailed: (state) => {
            state.addToCart.isFetching = false;
            state.addToCart.error = true
        },


    }
})

export const { addTocartStart, addToCartSuccess, addToCartFailed } = actionCartSlice.actions;
export default actionCartSlice.reducer