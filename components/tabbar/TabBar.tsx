import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, {Defs, } from "react-native-svg";
import AppImage from "../global/AppImage";
import { useDispatch, useSelector } from "react-redux";
import { TabBarActive } from "@/types/TabBarActive";
import { setTabBarActive } from "@/store/actions/interface";
import { router } from "expo-router";
import { resetModal } from "@/store/actions/modal";

export default function TabBar() {
    const safe = useSafeAreaInsets()
    const win = Dimensions.get('window').width
    const tabBarActive: TabBarActive = useSelector((state: any) => state.interface.tabBarActive)
    const dispatch: any = useDispatch()

    const getStyles = (block: TabBarActive) => {
        const st: any = {}
        if(block === tabBarActive) {
            st.opacity = 1
            st.position = 'static'
            st.top = 0
        }

        return st
    }

    const getProportion = () => {
        return win / 30
    }

    const leftButtonClickHandler = async () => {
        router.replace('/profile/')
        await dispatch(resetModal())
        await dispatch(setTabBarActive('left'))
    }

    const centerButtonClickHandler = async () => {
        router.replace('/profile/main')
        await dispatch(resetModal())
        await dispatch(setTabBarActive('center'))
    }

    const rightButtonClickHandler = async () => {
        await dispatch(resetModal())
        await dispatch(setTabBarActive('right'))
    }

    return (
        <View style={{...styles.wrap, paddingBottom: safe.bottom}}>
            <View style={{...styles.background, marginLeft: -(getProportion()), marginRight: -(getProportion())}}>
                <AppImage 
                    fullWidth={true}
                    addToWidth={getProportion() * 2}
                    source={require('@/assets/images/tabbar/activeLeft.png')}
                    wrapStyle={{...styles.img, bottom: safe.bottom, ...getStyles('left')}}
                />
                <AppImage 
                    fullWidth={true}
                    addToWidth={getProportion() * 2}
                    source={require('@/assets/images/tabbar/activeCenter.png')}
                    wrapStyle={{...styles.img, bottom: safe.bottom, ...getStyles('center')}}
                />
                <AppImage 
                    fullWidth={true}
                    addToWidth={getProportion() * 2}
                    source={require('@/assets/images/tabbar/activeRight.png')}
                    wrapStyle={{...styles.img, bottom: safe.bottom, ...getStyles('right')}}
                />
            </View>
            <View style={{...styles.white, bottom: safe.bottom}}></View>
            <View style={{...styles.buttons, paddingLeft: (win / 20), paddingRight: (win / 20), bottom: safe.bottom}}>
                <TouchableOpacity
                    onPress={leftButtonClickHandler}
                    style={styles.button}
                ></TouchableOpacity>
                <TouchableOpacity
                    onPress={centerButtonClickHandler}
                    style={styles.button}
                ></TouchableOpacity>
                <TouchableOpacity
                    onPress={rightButtonClickHandler}
                    style={styles.button}
                ></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: 'white',
        position: 'relative',
        top: -20,
        marginBottom: -20
    },
    img: {
        top: 500,
        position: 'absolute',
        left: 0,
        zIndex: 1
    },
    white: {
        backgroundColor: 'white',
        height: 12,
        position: 'absolute',
        left: 0,
        width: '100%',
        zIndex: 2
    },
    buttons: {
        position: 'absolute',
        zIndex: 5,
        left: 0,
        width: '100%',
        height: '90%',
        top: 15,
        flexDirection: 'row'
    },
    button: {
        width: '33.3333%',
        height: '100%'
    },
    background: {
        marginLeft: -10,
        marginRight: -10
    }
})