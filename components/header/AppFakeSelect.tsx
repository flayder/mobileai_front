import { StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, {Path} from "react-native-svg";
import { ThemedText } from "../ThemedText";
import { COLOR_PLACEHOLDER } from "@/constants/Colors";
import { useEffect, useState } from "react";

type AppFakeSelectProps = {
    onPress?: any
    placeholder: string
    value?: any
}

export default function AppFakeSelect({
    onPress,
    placeholder,
    value = ''
}: AppFakeSelectProps) {
    const [lvalue, setValue] = useState(value)

    useEffect(() => {
        if(value != lvalue) {
            setValue(value)
        }
    }, [value])

    return (
        <TouchableOpacity 
            style={styles.wrap}
            onPress={() => {
                if(onPress)
                    onPress()
            }}
        >
            <View style={styles.block}>
                <ThemedText type={'caption_2'} style={{color: COLOR_PLACEHOLDER}} wrapStyle={styles.placeholderWrap}>
                    {placeholder}
                </ThemedText>
                <ThemedText wrapStyle={styles.placeholderWrap}>
                    {lvalue}
                </ThemedText>
            </View>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path fillRule="evenodd" clipRule="evenodd" d="M4.41083 6.91083C4.73626 6.58539 5.2639 6.58539 5.58934 6.91083L10.0001 11.3216L14.4108 6.91083C14.7363 6.58539 15.2639 6.58539 15.5893 6.91083C15.9148 7.23626 15.9148 7.7639 15.5893 8.08934L10.5893 13.0893C10.2639 13.4148 9.73626 13.4148 9.41083 13.0893L4.41083 8.08934C4.08539 7.7639 4.08539 7.23626 4.41083 6.91083Z" fill="#18A3AD"/>
            </Svg>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    placeholderWrap: {
        paddingTop: 1,
        paddingBottom: 1
    },
    wrap: {
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

    }
})