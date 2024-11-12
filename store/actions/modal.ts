import { MODAL_CLOSE, MODAL_OPEN, MODAL_RESET, MODAL_SET_DATA, MODAL_SET_VALUE, SET_TAB_BAR_ACTIVE} from "../types";
import { ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ModalStoreType } from "@/types/ModalStoreType";
import { ModalStoreDataType } from "@/types/ModalStoreDataType";
//export const

export const openModal = (props: ModalStoreType): 
    ThunkAction<void, RootState, unknown, UnknownAction> => 
        async dispatch => {
            if(!props?.isOpened)
                props.isOpened = true

            dispatch({
                type: MODAL_OPEN,
                payload: props
            })
    }

export const closeModal = (): 
    ThunkAction<void, RootState, unknown, UnknownAction> => 
        async dispatch => {
            dispatch({
                type: MODAL_CLOSE,
                payload: false
            })
    }

export const resetModal = (key: string = ''): 
    ThunkAction<void, RootState, unknown, UnknownAction> => 
        async dispatch => {
            dispatch({
                type: MODAL_RESET,
                payload: key
            })
    }

export const setModalValue = (key: string, value: any): 
    ThunkAction<void, RootState, unknown, UnknownAction> => 
        async dispatch => {
            const val: any = {}
            if(key) {
                val[key] = value
            }
            dispatch({
                type: MODAL_SET_VALUE,
                payload: val
            })
    }

export const setModalData = (data: ModalStoreDataType): 
    ThunkAction<void, RootState, unknown, UnknownAction> => 
        async dispatch => {
            dispatch({
                type: MODAL_SET_DATA,
                payload: data
            })
    }