import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Checkbox, CheckboxProps } from "expo-checkbox";
import { useEffect, useState } from "react";
import { COLOR_GREEN } from "@/constants/Colors";

type AppRadioProps = CheckboxProps & {
    style?: any
    label?: string,
    wrapStyle?: any
}

export default function AppRadio({
    style,
    label,
    value,
    wrapStyle,
    onValueChange
}: AppRadioProps) {
    const [lvalue, setValue] = useState<boolean>()

    const onValueChangeHandler = (val: boolean) => {
        setValue(val)
        if(onValueChange)
            onValueChange(val)
    }

    useEffect(() => {

        if(value != lvalue)
            setValue(value)

    }, [value])

    return (
        <View style={{...styles.wrap, ...wrapStyle, ...{width: (label) ? '100%' : 'auto'}}}>
            <Checkbox
                onValueChange={onValueChangeHandler}
                style={{...styles.checkbox, ...style}}
                value={lvalue}
            />
            {label && <ThemedText style={{paddingRight: 10}}>
                {label}
            </ThemedText>}
            
            <View style={styles.currentRadio}>
                {lvalue && <View style={styles.checked}></View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    currentRadio: {
        width: 24,
        height: 24,
        borderColor: COLOR_GREEN,
        borderWidth: 1,
        borderRadius: 12,
        position: 'relative',
    },
    checked: {
        position: 'absolute',
        width: 14,
        height: 14,
        backgroundColor: COLOR_GREEN,
        borderRadius: 7,
        top: 4,
        left: 4
    },
    checkbox: {
        opacity: 0,
        zIndex: 3,
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
})