import { Platform, StyleSheet, TextInputProps, TouchableOpacity, View } from "react-native";
import Svg, {Path} from "react-native-svg";
import { ThemedText } from "../ThemedText";
import { COLOR_GREEN, COLOR_GREEN_DISABLED, COLOR_PLACEHOLDER } from "@/constants/Colors";
import { AppPlacehoderProps } from "@/types/AppPlaceholderProps";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";

type AppPlaceholderInput = AppPlacehoderProps & TextInputProps & {
    value?: any,
}

export default function AppPlaceholderInput({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    onBlur
}: AppPlaceholderInput) {
    const [lvalue, setValue] = useState(value)
    const [password, setPass] = useState(secureTextEntry)
    const [isPassword, setIsPassword] = useState<boolean>(false) 
    const [isFocused, setFocused] = useState<boolean>(false)
    const [size, setSize] = useState<number>(0)

    useEffect(() => {
        if(value != lvalue) {
            setValue(value)
        }
    }, [value])

    useEffect(() => {
        if(secureTextEntry != password)
            setPass(secureTextEntry)

        if(secureTextEntry) {
            setIsPassword(true)
        }
    }, [secureTextEntry])


    const passwordHandler = () => {
        setPass(!password)
    }

    const bodyStructure = () => {
        return (
            <View>
                <ThemedText type={'caption_2'} style={{color: COLOR_PLACEHOLDER}} wrapStyle={{...styles.placeholder, ...styles.placeholderWrap}}>
                    {placeholder}
                </ThemedText>
                {!isFocused && <ThemedText wrapStyle={{...styles.placeholderWrap, ...styles.text, ...{marginBottom: Platform.OS == 'android' ? -6 : 0}}} style={styles.textStyle} onSize={(s: number) => {
                    if(s > 0) {
                        setSize(s)
                    }
                }}>
                    {lvalue}
                </ThemedText>}
                {isFocused && <View style={styles.input}>
                    <TextInput 
                    style={{...styles.placeholderWrap, ...styles.text, fontSize: size > 0 ? size : 16, marginBottom: Platform.OS == 'android' ? -5 : 0}}
                    autoFocus={isFocused}
                    secureTextEntry={password}
                    value={lvalue}
                    onBlur={() => {
                        setFocused(false)
                        if(onBlur) {
                            onBlur(lvalue)
                        }
                    }}
                    onChangeText={text => {
                        setValue(text)
                        if(onChangeText)
                            onChangeText(text)
                    }}
                /></View>}
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
    return (
        <View style={{...styles.wrap, borderColor: isFocused ? COLOR_GREEN : 'white'}}>
            {!isFocused && <TouchableOpacity 
                onPress={() => setFocused(true)}
                style={styles.block}>
                {bodyStructure()}
            </TouchableOpacity>}
            {isFocused && <View style={styles.block}>
                {bodyStructure()}
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    password: {
        position: 'absolute',
        right: 5,
        top: 10
    },
    input: {
        marginTop: 5,
        marginBottom: -3
    },
    placeholder: {

    },
    placeholderWrap: {
        paddingTop: 1,
        paddingBottom: 1,
        height: 24,
        marginTop: 0,
        marginBottom: 5,
        fontSize: 16,
        lineHeight: 18
    },
    text: {
        paddingTop: 0,
        marginTop: -10
    },
    textStyle: {
        
    },
    wrap: {
        borderWidth: 1,
        borderColor: 'white',
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 5,
        marginTop: 5
    },
    block: {
        width: '100%'
    }
})