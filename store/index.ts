import {combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { interfaceReducer } from "./reducers/interface";
import { modalReducer } from "./reducers/modal";

const rootReducer = combineReducers({
    user: userReducer,
    interface: interfaceReducer,
    modal: modalReducer
})
export type RootState = ReturnType<typeof rootReducer>

export default configureStore({reducer: rootReducer})