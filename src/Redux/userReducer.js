import {createReducer, createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {usersAPI} from "../api/users";

const initialState = {
    data: [],
    isLoading: false,
}

export const getUsers = createAsyncThunk(
    'getUsers',
    async (query) => {
        try {
            const payload = await usersAPI.getUsers(query);
            return payload;
        } catch (error) {
            console.error(error);
        }
    }
);

export const setUsers = createAction(
    'setUsers',
);

export default createReducer(initialState,{
    [getUsers.pending.type]: function (state) {
        state.isLoading = true;
    },
    [getUsers.fulfilled.type]: function (state, action) {
        state.data = action.payload;
        state.isLoading = false;
    },
    [getUsers.rejected.type]: function (state) {
        state.isLoading = false;
    },
    [setUsers]: function (state, action) {
        state.data = action.payload;
    }
})
