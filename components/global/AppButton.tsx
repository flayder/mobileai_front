import { TouchableOpacity, View, StyleSheet, type TouchableOpacityProps } from "react-native";
import { ThemedText } from "../ThemedText";
import { COLOR_BTN_GREY, COLOR_GREEN, COLOR_GREEN_HOVER } from "@/constants/Colors";
import { useEffect, useState } from "react";
import AppImage from "./AppImage";
import { useRouter } from "expo-router";

export type AppButtonProps = TouchableOpacityProps & {
  color?: "green" | "white" | "grey",
  style?: any,
  disabled?: boolean
  loading?: boolean
  route?: string
}

export default function AppButton({
    children,
    disabled = false,
    loading = false,
    style,
    color = "green",
    route,
    onPress
}: AppButtonProps) {
    const router = useRouter()
    const [backColor, setBackColor] = useState(COLOR_GREEN)
    const [textColor, setTextColor] = useState('white')
    const [opacity, setOpacity] = useState(1)
    const [ldisabled, setDisabled] = useState(false)
    const [load, setLoad] = useState(loading)

    useEffect(() => {
        var ld = disabled
        if(disabled !== ldisabled) {
            setDisabled(disabled)
            ld = disabled
        }
        var ll = loading
        if(load !== loading) {
            setLoad(loading)
            ll = loading
        }

        if(!ll) {
            if(!ld) {
                if(color === 'white') {
                    setBackColor('white')
                    setTextColor(COLOR_GREEN)
                }
                if(color === 'grey') {
                    setBackColor(COLOR_BTN_GREY)
                    setTextColor('black')
                }
                setOpacity(1)
            } else {
                setOpacity(.4)
            }
        } else {
            setBackColor(COLOR_GREEN_HOVER)
        }
    }, [disabled, loading, ldisabled, load])

    const onPressInHandler = () => {
        if(!load) {
            if(color === 'white' || color === 'grey') {
                setTextColor('white')
            }

            setBackColor(COLOR_GREEN_HOVER)
        }
    }

    const onPressOutHandler = () => {
        if(!load) {
            if(color === 'green') {
                setBackColor(COLOR_GREEN)
            }
    
            if(color === 'white') {
                setBackColor('white')
                setTextColor(COLOR_GREEN)
            }

            if(color === 'grey') {
                setBackColor(COLOR_BTN_GREY)
                setTextColor('black')
            }

            if(route) {
                router.push({pathname: route as any})
            }
        }
    }

    const onPressHandler = (event: any) => {
        if(!ldisabled && onPress) {
            onPress(event)
            if(route) {
                setTimeout(() => {
                    router.push({pathname: route as any})
                }, 500);
            }
        }
    }

    return (
        <View style={styles.wrap}>
            <TouchableOpacity 
                activeOpacity={1} 
                onPress={onPressHandler}
                onPressIn={onPressInHandler}
                onPressOut={onPressOutHandler}
                style={{...styles.button, ...style, borderColor: (color === 'grey') ? COLOR_BTN_GREY : COLOR_GREEN, backgroundColor: backColor, opacity}}
            >
                {
                    !load 
                    ?
                    <ThemedText type="defaultSemiBold" style={{color: textColor}}>
                        {children}
                    </ThemedText>
                    :
                    <AppImage source={require('@/assets/images/ui/button-load.gif')} style={{width: 15, height: 15}} />
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        paddingTop: 5,
        paddingBottom: 5
    },
    button: {
        borderRadius: 30,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 52
    }
})