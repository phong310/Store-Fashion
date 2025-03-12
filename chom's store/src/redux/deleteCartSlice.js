import { createSlice } from '@reduxjs/toolkit'

const deleteCartSlice = createSlice({
    name: "delete",
    initialState: {
        deleteItem: {
            itemDelete: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        deleteItemStart: (state) => {
            state.deleteItem.isFetching = true;
        },
        deleteItemSuccess: (state, actions) => {
            state.deleteItem.isFetching = false;
            state.deleteItem.itemDelete = actions.payload;
            state.deleteItem.error = false;
        },
        deleteItemFaild: (state) => {
            state.deleteItem.isFetching = false;
            state.deleteItem.error = true
        }

    }
})

export const { deleteItemStart, deleteItemSuccess, deleteItemFaild } = deleteCartSlice.actions;
export default deleteCartSlice.reducer