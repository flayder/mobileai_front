import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Checkbox, CheckboxProps } from "expo-checkbox";
import { useEffect, useState } from "react";
import { COLOR_GREEN } from "@/constants/Colors";
import Svg, {Path} from "react-native-svg";

export type AppCheckboxProps = CheckboxProps & {
    label?: string
    style?: any
}

export default function AppCheckbox({
    style,
    value,
    label,
    onValueChange
}: AppCheckboxProps) {
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
        <View style={styles.wrap}>
            <Checkbox
                onValueChange={onValueChangeHandler}
                style={{...styles.checkbox, ...style}}
                value={lvalue}
            />
            <View style={styles.currentCheckbox}>
                {lvalue && <View style={styles.checked}>
                    <Svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                        <Path d="M9.58818 0.860821C9.65539 0.799375 9.73561 0.750561 9.82414 0.717237C9.91267 0.683913 10.0077 0.666748 10.1038 0.666748C10.1998 0.666748 10.2948 0.683913 10.3834 0.717237C10.4719 0.750561 10.5521 0.799375 10.6193 0.860821C10.901 1.11584 10.9049 1.52793 10.6292 1.78736L4.80566 7.95544C4.73954 8.02049 4.6593 8.07277 4.56986 8.10909C4.48041 8.1454 4.38364 8.16498 4.28546 8.16664C4.18727 8.16829 4.08975 8.15197 3.99884 8.11869C3.90794 8.08541 3.82557 8.03587 3.75677 7.97309L0.213216 4.7558C0.0765529 4.63093 0 4.46301 0 4.28812C0 4.11323 0.0765529 3.94532 0.213216 3.82044C0.280429 3.75899 0.360649 3.71018 0.449179 3.67686C0.537709 3.64353 0.632769 3.62637 0.728795 3.62637C0.82482 3.62637 0.919881 3.64353 1.00841 3.67686C1.09694 3.71018 1.17716 3.75899 1.24437 3.82044L4.25019 6.54975L9.56848 0.880234C9.57461 0.873415 9.58119 0.866932 9.58818 0.860821Z" fill="white"/>
                    </Svg>
                </View>}
            </View>
            {label && <ThemedText style={styles.text}>
                {label}
            </ThemedText>}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        width: '100%'
    },
    wrap: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 5,
        marginBottom: 5
    },
    currentCheckbox: {
        width: 20,
        height: 20,
        borderColor: COLOR_GREEN,
        borderWidth: 1,
        marginRight: 10,
        borderRadius: 6,
        position: 'relative'
    },
    checked: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: COLOR_GREEN,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkbox: {
        opacity: 0,
        zIndex: 3,
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
})