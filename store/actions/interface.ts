import { SET_TAB_BAR_ACTIVE} from "../types";
import { ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TabBarActive } from "@/types/TabBarActive";
//export const

export const setTabBarActive = (active: TabBarActive): 
    ThunkAction<void, RootState, unknown, UnknownAction> => 
        async dispatch => {
            dispatch({
                type: SET_TAB_BAR_ACTIVE,
                payload: active
            })
    }