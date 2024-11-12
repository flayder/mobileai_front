import { ModalStoreDataType } from "./ModalStoreDataType"

export type ModalStoreType = {
    key: string
    title?: string
    data?: Array<ModalStoreDataType>
    dataSingle?: any
    isOpened?: boolean
    type: "radio" | "list" | "calendar"
}