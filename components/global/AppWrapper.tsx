import { COLOR_BACKGROUND } from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";
import { PropsWithChildren } from "react";
import { Platform, ScrollView, StyleSheet, View, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type Props = PropsWithChildren<{
    withoutHeader?: boolean,
    withoutTabBar?: boolean,
    style?: any
}>;


export default function AppWrapper({
    children,
    withoutHeader,
    withoutTabBar,
    style
}: Props) {
    const platform = Platform.OS
    const header = useHeaderHeight()
    var height = Dimensions.get('window').height
    var contentStyle = {} as any
    const params = useSafeAreaInsets()

    if(platform == 'android')
        contentStyle.flexGrow = 1

    if(withoutHeader) {
        if(!style)
            style = {paddingTop: params.top, bottomTop: params.bottom}

        if(typeof style == 'object') {
            style.paddingTop = params.top
        }
    } else {
        height -= header
    }

    if(withoutTabBar) {
        // if(!style)
        //     style = {bottomTop: params.bottom}

        // if(typeof style == 'object') {
        //     style.paddingBottom = params.top
        // }
    } else {
        height -= params.bottom
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={{...styles.style, ...style}}
                edges={[]}
            >
                <ScrollView contentContainerStyle={{minHeight: height}}>
                    <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
                        <View style={{flex: 1, position: 'relative'}}>
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    style: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: COLOR_BACKGROUND
    }
})