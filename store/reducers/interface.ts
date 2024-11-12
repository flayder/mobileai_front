import {SET_TAB_BAR_ACTIVE} from "@/store/types";

const initialState = {
    tabBarActive: 'center'
}

export const interfaceReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_TAB_BAR_ACTIVE: return {
            ...state,
            tabBarActive: action.payload
        }
        default: return state
    }
}