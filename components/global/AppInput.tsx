import { COLOR_FAIL, COLOR_GREEN, COLOR_GREEN_DISABLED } from "@/constants/Colors";
import { useEffect, useState } from "react";
import Svg, {Path} from "react-native-svg";
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData, TextInputProps, View, TouchableOpacity } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

export type AppTextInputProps = TextInputProps & {
    style?: any
    container?: any
    phone?: boolean
    error?: boolean
}

export default function AppInput({
    style,
    container,
    onFocus,
    onBlur,
    onChangeText,
    secureTextEntry = false,
    phone = false,
    error = false,
    ...rest
}: AppTextInputProps) {
    const [focus, setFocus] = useState<boolean>(false)
    const [isError, setError] = useState<boolean>(false)
    const [password, setPass] = useState<boolean>(secureTextEntry ?? false)
    const [isPassword, setIsPassword] = useState<boolean>(false)

    useEffect(() => {
        if(error != isError)
            setError(error)
    }, [error])

    useEffect(() => {
        if(secureTextEntry != password)
            setPass(secureTextEntry)
        if(secureTextEntry) {
            setIsPassword(true)
        }
    }, [secureTextEntry])

    const onFocusHandler = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if(onFocus)
            onFocus(event)

        if(focus === false)
            setFocus(true)
    }

    const onBlurHandler = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if(onBlur)
            onBlur(event)

        if(focus === true)
            setFocus(false)
    }
    const passwordHandler = () => {
        setPass(!password)
    }

    const getBorderColor = () => {
        var color = 'white'
        if(focus)
            color = COLOR_GREEN
        if(isError)
            color = COLOR_FAIL

        return color
    }

    return (
        <View style={{...styles.wrap, ...container}}>
            {!phone ? <TextInput 
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                secureTextEntry={password}
                onChangeText={(text) => {
                    if(onChangeText)
                        onChangeText(text)
                }}
                {...rest}
                style={{...styles.input, ...style, borderColor: getBorderColor()}}
            /> : <MaskedTextInput 
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                mask={"+7 (999)-999-99-99"}
                onChangeText={(text, rawText) => {
                  if(onChangeText) {
                    onChangeText(rawText)
                  }
                }}
                {...rest}
                style={{...styles.input, ...style, borderColor: getBorderColor()}}
            />
            }
            {
                isPassword && <TouchableOpacity style={styles.password} onPress={passwordHandler}>
                    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <Path d="M1.71835 10.2901C1.6489 10.103 1.6489 9.89715 1.71835 9.71006C2.39476 8.06994 3.54294 6.66759 5.01732 5.68081C6.4917 4.69402 8.22588 4.16724 10 4.16724C11.7741 4.16724 13.5083 4.69402 14.9827 5.68081C16.4571 6.66759 17.6053 8.06994 18.2817 9.71006C18.3511 9.89715 18.3511 10.103 18.2817 10.2901C17.6053 11.9302 16.4571 13.3325 14.9827 14.3193C13.5083 15.3061 11.7741 15.8329 10 15.8329C8.22588 15.8329 6.4917 15.3061 5.01732 14.3193C3.54294 13.3325 2.39476 11.9302 1.71835 10.2901Z" stroke={password ? COLOR_GREEN : COLOR_GREEN_DISABLED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <Path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke={password ? COLOR_GREEN : COLOR_GREEN_DISABLED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </Svg>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        position: 'relative',
        paddingTop: 5,
        paddingBottom: 5
    },
    password: {
        position: 'absolute',
        right: 22,
        top: 22
    },
    input: {
        backgroundColor: 'white',
        fontFamily: 'Inter',
        borderRadius: 16,
        borderWidth: 1,
        height: 52,
        fontSize: 16,
        paddingLeft: 15,
        paddingRight: 15
    }
})