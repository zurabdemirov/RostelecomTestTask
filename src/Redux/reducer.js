import {createReducer, createAction} from "@reduxjs/toolkit";

const initialState = {
    count: 0,
}

const increment = createAction("INCREMENT")

export default createReducer(initialState,{
    [increment]: function (state) {
        state.count = state.count + 1
    }
})