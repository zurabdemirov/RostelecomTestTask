import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import reducer from "./reducer";

const rootReducer = combineReducers({
    toolkit: reducer
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
)

