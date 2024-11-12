import { ModalStoreDataType } from "@/types/ModalStoreDataType";

export function getFakeSelectName(items: Array<ModalStoreDataType>, name: string) {
    var val = ''
    var items = items.filter((item) => item.name == name)
    if(items.length > 0) {
        val = items[0].name
    }

    return val
}

export function getErrorStatus(key: string, response: any): boolean {
    if(response?.errors) {
        if(typeof response.errors == 'object') {
            for(let index in response.errors) {
                if(index == key)
                    return true
            }
        }
    }
    return false
}