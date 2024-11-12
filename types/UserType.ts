import { CityType } from "./CityType"

export type UserType = {
    id: number
    phone: string
    name: string
    login: null | string
    city: null | CityType
    birthday: null | string
    height: null | number
    weight: null | number
    sex: null | string
}