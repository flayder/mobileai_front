import {GET_CURRENT_USER, REMEMBER_TOKEN} from "@/store/types";

const initialState = {
    currentUser: {},
    registerToken: null
}

export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_CURRENT_USER: return {
            ...state,
            currentUser: action.payload
        }
        case REMEMBER_TOKEN: return {
            ...state,
            registerToken: action.payload
        }
        default: return state
    }
}