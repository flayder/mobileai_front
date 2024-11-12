import { COLOR_BACKGROUND, COLOR_GREEN, COLOR_GREEN_HOVER } from "@/constants/Colors";
import { StatusBar, StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, {Path} from "react-native-svg";
import { ThemedText } from "../ThemedText";

export type HeaderBackButtonProps = ViewProps & {
    props: any
    color?: 'green' | 'white'
}

export default function Header({
    props,
    color = 'white',
    children
}: HeaderBackButtonProps) {
    const safe = useSafeAreaInsets()
    const localStyle: any = {
        backgroundColor: color == 'white' ? COLOR_BACKGROUND : COLOR_GREEN,
        paddingTop: safe.top + 20,
        paddingLeft: 10,
        paddingRight: 10
    }
    const notificationBg = color == 'white' ? COLOR_GREEN : COLOR_GREEN_HOVER
    const helpColor = color == 'white' ? COLOR_GREEN : 'white'

    return (
        <View style={{...styles.header, ...localStyle}}>
            <StatusBar 
                barStyle={color === 'white' ? 'dark-content' : 'light-content'}
            />
            <View style={styles.wrap}>
                <TouchableOpacity
                    style={styles.helpColor}
                >
                    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <Path d="M12 22.5C6.21 22.5 1.5 17.79 1.5 12C1.5 6.21 6.21 1.5 12 1.5C17.79 1.5 22.5 6.21 22.5 12C22.5 17.79 17.79 22.5 12 22.5ZM12 3C7.035 3 3 7.035 3 12C3 16.965 7.035 21 12 21C16.965 21 21 16.965 21 12C21 7.035 16.965 3 12 3Z" fill={helpColor}/>
                        <Path d="M12 6.75C10.335 6.75 9 8.085 9 9.75H10.5C10.5 8.925 11.175 8.25 12 8.25C12.825 8.25 13.5 8.925 13.5 9.75C13.5 11.25 11.25 11.07 11.25 13.5H12.75C12.75 11.82 15 11.625 15 9.75C15 8.085 13.665 6.75 12 6.75Z" fill={helpColor}/>
                        <Path d="M12.0001 17.4301C12.5137 17.4301 12.9301 17.0137 12.9301 16.5001C12.9301 15.9864 12.5137 15.5701 12.0001 15.5701C11.4864 15.5701 11.0701 15.9864 11.0701 16.5001C11.0701 17.0137 11.4864 17.4301 12.0001 17.4301Z" fill={helpColor}/>
                        <Path d="M9.75 10.5C10.1642 10.5 10.5 10.1642 10.5 9.75C10.5 9.33579 10.1642 9 9.75 9C9.33579 9 9 9.33579 9 9.75C9 10.1642 9.33579 10.5 9.75 10.5Z" fill={helpColor}/>
                        <Path d="M12 14.25C12.4142 14.25 12.75 13.9142 12.75 13.5C12.75 13.0858 12.4142 12.75 12 12.75C11.5858 12.75 11.25 13.0858 11.25 13.5C11.25 13.9142 11.5858 14.25 12 14.25Z" fill={helpColor}/>
                    </Svg>
                    <ThemedText type="subhead" style={{marginLeft: 5, color: helpColor}}>
                        Помощь
                    </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{...styles.notification, backgroundColor: notificationBg}}
                >
                    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <Path d="M9.00003 0C7.20982 0 5.49293 0.711159 4.22706 1.97703C2.96119 3.2429 2.25003 4.95979 2.25003 6.75V10.3522L0.803281 13.9718C0.757811 14.0856 0.740926 14.2088 0.754104 14.3306C0.767281 14.4525 0.81012 14.5693 0.878871 14.6707C0.947622 14.7722 1.04019 14.8552 1.14848 14.9126C1.25677 14.9701 1.37747 15 1.50003 15H6.00003C6.00003 16.6628 7.33728 18 9.00003 18C10.6628 18 12 16.6628 12 15H16.5C16.6226 15 16.7433 14.9701 16.8516 14.9126C16.9599 14.8552 17.0524 14.7722 17.1212 14.6707C17.1899 14.5693 17.2328 14.4525 17.246 14.3306C17.2591 14.2088 17.2423 14.0856 17.1968 13.9718L15.75 10.3522V6.75C15.75 4.95979 15.0389 3.2429 13.773 1.97703C12.5071 0.711159 10.7902 0 9.00003 0ZM10.5 15C10.5 15.834 9.83403 16.5 9.00003 16.5C8.16603 16.5 7.50003 15.834 7.50003 15H10.5ZM3.75003 6.75C3.75003 5.35761 4.30315 4.02226 5.28772 3.03769C6.27229 2.05312 7.60764 1.5 9.00003 1.5C10.3924 1.5 11.7278 2.05312 12.7123 3.03769C13.6969 4.02226 14.25 5.35761 14.25 6.75V10.4963C14.2499 10.5915 14.268 10.686 14.3033 10.7745L15.3923 13.5H2.60778L3.69678 10.7745C3.73195 10.6862 3.75002 10.592 3.75003 10.497V6.75Z" fill="white"/>
                    </Svg>
                </TouchableOpacity>
            </View>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomLeftRadius: 26,
        borderBottomRightRadius: 26,
        overflow: 'hidden',
        paddingBottom: 10,
        marginBottom: 10
    },
    wrap: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    helpColor: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    notification: {
        width: 32,
        height: 32,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})