import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import {Svg, Path} from 'react-native-svg';


export type HeaderBackButtonProps = TouchableOpacityProps & {
    style?: any
}

export default function HeaderBackButton({
    style,
    onPress
}: HeaderBackButtonProps) {
    return (
        <TouchableOpacity
            style={{...styles.button, ...style}}
            onPress={onPress}
        >
            <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                <Path d="M0 9.93896C0 10.3208 0.145996 10.6465 0.449219 10.9385L9.20898 19.5073C9.44482 19.7544 9.75928 19.8779 10.1187 19.8779C10.8486 19.8779 11.4214 19.3164 11.4214 18.5752C11.4214 18.2158 11.2754 17.8901 11.0283 17.6431L3.1333 9.93896L11.0283 2.23486C11.2754 1.97656 11.4214 1.65088 11.4214 1.2915C11.4214 0.561523 10.8486 0 10.1187 0C9.75928 0 9.44482 0.123535 9.20898 0.370605L0.449219 8.93945C0.145996 9.23145 0.0112305 9.55713 0 9.93896Z" fill="#1A1A1A"/>
                <Path d="M0 9.93896C0 10.3208 0.145996 10.6465 0.449219 10.9385L9.20898 19.5073C9.44482 19.7544 9.75928 19.8779 10.1187 19.8779C10.8486 19.8779 11.4214 19.3164 11.4214 18.5752C11.4214 18.2158 11.2754 17.8901 11.0283 17.6431L3.1333 9.93896L11.0283 2.23486C11.2754 1.97656 11.4214 1.65088 11.4214 1.2915C11.4214 0.561523 10.8486 0 10.1187 0C9.75928 0 9.44482 0.123535 9.20898 0.370605L0.449219 8.93945C0.145996 9.23145 0.0112305 9.55713 0 9.93896Z" fill="black" fillOpacity="0.2"/>
            </Svg>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingLeft: 10,
        width: 40,
        height: 30
    }
})