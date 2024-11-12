import { AppFetch } from "@/utils/AppFetch";
import {GET_CURRENT_USER, HAS_ACCESS, REMEMBER_TOKEN} from "../types";
import { ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { DB } from "@/utils/db";
//export const

export const saveDataUser = (data: FormData): 
    ThunkAction<void, RootState, unknown, UnknownAction> => 
        async dispatch => {
            console.log('data', data)
            console.log('datadata', typeof data)
            const response = await AppFetch.postWithToken('save_user_data', data)
            console.log('response', response)
            if(response.status === 200) {
                dispatch({
                    type: GET_CURRENT_USER,
                    payload: response.result
                })
            }
    }

export const getCurrentUser = (): 
    ThunkAction<void, RootState, unknown, UnknownAction> => 
        async dispatch => {
            console.log('okok222o')
            const response = await AppFetch.postWithToken('current_user')
            console.log('getCurrentUser', response)
            if(response.status === 200) {
                dispatch({
                    type: GET_CURRENT_USER,
                    payload: response.result
                })
            }
    }

export const hasAccess = ():
    ThunkAction<void, RootState, unknown, UnknownAction> => 
    async dispatch => {
        let payload = false
        const token = DB.getOption('token')

        if(token) {
            const isAuth = await AppFetch.get("isAuth", {}, {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            })
            //console.log('isAuth', isAuth)
            if(isAuth) payload = true
            else payload = false
        }
        dispatch({
            type: HAS_ACCESS,
            payload: payload
        })
    }

// export const getCurrentUser = () => {
//     return dispatch => {
//         DB.getUser().then(dbUser => {
//             let payload = false
//             if(dbUser.token) {
//                 AppFetch
//             }
//             dispatch({
//                 type: GET_CURRENT_USER,
//                 payload: payload
//             })
//         })
//     }
// }

// export const setRememberToken = ($token) => {
//     return dispatch => {
//         dispatch({
//             type: REMEMBER_TOKEN,
//             payload: $token
//         })
//     }
// }