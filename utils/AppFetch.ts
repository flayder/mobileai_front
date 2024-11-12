import {DB} from "./db";
import React from "react"
import {Platform} from "react-native";
// import RNFetchBlob from "rn-fetch-blob";
// import {GetFileName, LinkTo} from "../global";
import { router } from "expo-router";
import { Notifier, NotifierComponents } from "react-native-notifier";
import { COLOR_FAIL } from "@/constants/Colors";
const KEY_TOKEN = 'appPushToken'

export class AppFetch {
    static url = "https://medicalai.flayder-developer.ru/api/"

    static logOut = async () => {
        await DB.createOrUpdate(KEY_TOKEN, "")
        await DB.createOrUpdate("phone", "")
        await DB.createOrUpdate("password", "")

        router.replace('/')
    }

    static async errorResponsePromise(response: any) {
        console.log('errorResponsePromiseResponse', response)
        try {
            //const error = await response.text()
            return Promise.resolve({
                result: false,
                data: response
            })
        } catch(e) {
            //console.log('errorInsideErrorResponse', e)
        }

        return Promise.resolve({
            return: false,
            data: false
        })
    }

    static errorResponse(error: any) {
        //console.log(error)
        return {
            result: false,
            data: error
        }
    }

    static addTokenToParams(params: any, token: string) {
        const newParams = params
        newParams.token = token

        return newParams
    }

    static async tryingToRetakeToken(json: any, url: string, params: any, headers: any) {
        //console.log(url, json.status)
        if(json.status === 405) {
            //
            const phone = await DB.getOption('phone')
            const password = await DB.getOption('password')
            if(phone && password) {
                const getToken: any = await AppFetch.get("signin", {phone: phone, password: password})
                if(getToken?.token && getToken.token) {
                    await DB.createOrUpdate("token", getToken.token)

                    json = await AppFetch.getWithToken(url, AppFetch.addTokenToParams(params, getToken.token), headers)
                } else
                    await AppFetch.logOut()
            }
        }

        return Promise.resolve(json)
    }

    // static parseFormData = (data: any) => {
    //     let arr = []
    //     if(data.hasOwnProperty('_parts') && Array.isArray(data._parts)) {
    //         for(let i = 0; i < data._parts.length; i++) {
    //             if(Array.isArray(data._parts[i]) && data._parts[i].length >= 2) {
    //                 let d = data._parts[i]
    //                 if(typeof d[1] == "object" && d[1].hasOwnProperty("uri")) {
    //                     const file = GetFileName(d[1].uri, true)
    //                     const fileArr = file.split(".")
    //                     arr.push({
    //                         name: d[0],
    //                         filename: file,
    //                         type:'image/' + fileArr[fileArr.length - 1],
    //                         data: RNFetchBlob.wrap(d[1].uri)
    //                     })
    //                 } else if(typeof d[1] == "object") {
    //                     arr.push({
    //                         name: d[0],
    //                         data: JSON.stringify(d[1])
    //                     })
    //                 } else {
    //                     arr.push({
    //                         name: d[0],
    //                         data: ""+d[1]
    //                     })
    //                 }
    //             }
    //         }
    //     } else {
    //         arr = data
    //     }

    //     //console.log('postParam', arr)
    //     return arr
    // }

    static async tryingToFindErrors({response, url, params, headers, type, body}: any) {
        let cloneResponse: any = JSON.stringify(response)
        //console.log('responseClone', cloneResponse)
        let text: any = await response.text()
        let json: any = {}
        //onsole.log('text', text.substr(0, 1000))

        json = JSON.parse(text)
        cloneResponse = JSON.parse(cloneResponse)
        const status: any = cloneResponse.status
        json.status = status ?? 404
        
        
        if(json.status === 422) {
            //console.log('json?.errors && json.errors?.length 111', json.errors)
            if(json?.errors) {
                const errors = []
                for(let key in json.errors) {
                    if(json.errors[key]?.length) {
                        for(let i in json.errors[key]) 
                            errors.push(json.errors[key][i])
                    }
                }
                Notifier.showNotification({
                  title: 'Ошибки!',
                  description: errors.join('\n'),
                  Component: NotifierComponents.Alert,
                  componentProps: {
                    alertType: 'error'
                  },
                  containerStyle: {
                    backgroundColor: COLOR_FAIL
                  }
                })
            }
        }

        return Promise.resolve(json)
    }

    static async get(url: string, params: any = {}, headers: any = {}) {
        try {
            headers = {
                ...headers,
                ...{
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data"
                }
            }
            const response = await fetch(AppFetch.url + url + "?" + new URLSearchParams(params), {
                method: "GET",
                body: null,
                headers: headers
            })
            return await AppFetch.tryingToFindErrors({
                response,
                url,
                params,
                headers,
                type: "get"
            })
        } catch (error) {
            console.log('GET error', error)
            return await AppFetch.errorResponsePromise(error)
        }
        //return Promise
    }

    static async getWithToken(url: string, params: any = {}, headers: any = {}) {
        //console.log('canGoBack', navigation.canGoBack())
        const token = await DB.getOption('token')
        if(token) 
            headers = {...headers, Authorization: `Bearer ${token}`}

        const response = await AppFetch.get(url, params, headers)
        return Promise.resolve(await AppFetch.tryingToRetakeToken(response, url, params, headers))

    }

    static async post(url: string, body: any = {}, params: any = {}, headers: any = {}) {
        //console.log('POST url + "?" + new URLSearchParams(params)', url + "?" + new URLSearchParams(params))
        try {
            headers = {
                ...headers,
                ...{
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data"
                }
            }
            let response
            // if(Platform.OS != "android")
                response = await fetch(AppFetch.url + url + "?" + new URLSearchParams(params), {
                    method: "POST",
                    body: body,
                    headers: headers
                })
            // else
            //     response = await RNFetchBlob.fetch('POST', AppFetch.url + url + "?" + new URLSearchParams(params), headers, AppFetch.parseFormData(body))
            return await AppFetch.tryingToFindErrors({
                response,
                url,
                body,
                params,
                headers,
                type: "post"
            })
        } catch (error) {
            //console.log('error', error)
            return await AppFetch.errorResponsePromise(error)
        }
    }

    static async postWithToken(url: string, body: any = {}, params: any = {}, headers: any = {}) {
        //console.log('canGoBack', navigation.canGoBack())
        console.log('ssss')
        const token = await DB.getOption('token')
        console.log('token', token)
        //const token = 'ca58ec91aadf2f8b35af7ed2acca496ff3c8e9fca92df79a1658c58cc1bdfab4'
        if(token) 
            headers = {...headers, Authorization: `Bearer ${token}`}
        const response = await AppFetch.post(url, body, params, headers)
        return Promise.resolve(await AppFetch.tryingToRetakeToken(response, url, params, headers))
    }
}