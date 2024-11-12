import {MODAL_CLOSE, MODAL_OPEN, MODAL_RESET, MODAL_SET_DATA, MODAL_SET_VALUE} from "@/store/types";
import { ModalStoreType } from "@/types/ModalStoreType";

const initialState = {
    isOpened: false,
    title: '',
    data: [],
    type: '',
    value: {},
    key: '',
    dataSingle: null
}

export const modalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case MODAL_OPEN: return {
            ...state,
            isOpened: action.payload.isOpened,
            title: action.payload.title,
            data: action.payload.data,
            type: action.payload.type,
            key: action.payload.key,
            dataSingle: action.payload.dataSingle
        }
        case MODAL_RESET: 
            var val = JSON.parse(JSON.stringify(state.value))
            if(action.payload != '' && val[action.payload])
                delete val[action.payload]
            else
                val = {}

            return {
                ...state,
                title: '',
                data: [],
                type: '',
                dataSingle: null,
                value: val
            }
        case MODAL_CLOSE: return {
            ...state,
            isOpened: action.payload
        }
        case MODAL_SET_DATA: return {
            ...state,
            data: action.payload
        }
        case MODAL_SET_VALUE: 
            var val = JSON.parse(JSON.stringify(state.value))
            if(typeof val != 'object')
                val = {}

            var newValue = {}

            if(typeof action.payload == 'object')
                newValue = action.payload

            return {
                ...state,
                value: {
                    ...val,
                    ...newValue
                }
            }
        default: return state
    }
}