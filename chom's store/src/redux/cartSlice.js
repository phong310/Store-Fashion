import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartList: {
            allCart: [],
            isFetching: false,
            error: false,
        },

    },
    reducers: {
        getCartStart: (state) => {
            state.cartList.isFetching = true;
        },
        getCartSuccess: (state, actions) => {
            state.cartList.isFetching = false;
            state.cartList.allCart = actions.payload;
            state.cartList.error = false;
        },
        getCartFaild: (state) => {
            state.cartList.isFetching = false;
            state.cartList.error = true
        },
        resetCart: (state) => {
            state.cartList.allCart = [];
        }
    }
})

export const { getCartStart, getCartSuccess, getCartFaild, resetCart } = cartSlice.actions;

export default cartSlice.reducer