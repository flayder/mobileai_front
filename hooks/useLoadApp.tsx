import { DB } from "@/utils/db";
import { useEffect, useState } from "react";

export default function useLoadApp() {
    const [appLoaded, setLoad] = useState(false)
    
    useEffect(() => {
        
        (async () => {
            console.log('fhfjhfhjfhfjh')
            await DB.init()
            setLoad(true)
        })
    }, [])
    
    return appLoaded
}