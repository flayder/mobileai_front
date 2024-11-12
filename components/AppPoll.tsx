import { StyleSheet, View } from "react-native";
import AppImage from "./global/AppImage";
import { ThemedText } from "./ThemedText";
import AppButton from "./global/AppButton";

export default function AppPoll() {
    return (
        <View style={styles.wrap}>
            <AppImage 
                style={styles.img}
                source={require('@/assets/images/profile/virus.png')}
            />
            <ThemedText type="subhead" style={styles.title}>
                Болели Covid-19?
            </ThemedText>
            <View style={styles.btns}>
                <AppButton color="grey" style={styles.btn}>
                    Да
                </AppButton>
                <AppButton color='white' style={styles.btn}>
                    Нет
                </AppButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 10,
        marginBottom: 10
    },
    btns: {
        flexDirection: 'row'
    },
    wrap: {
        width: '100%',
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 30,
        borderRadius: 8,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 47,
        height: 42
    },
    btn: {
        width: 80,
        borderRadius: 8,
        marginLeft: 3,
        marginRight: 3
    }
})