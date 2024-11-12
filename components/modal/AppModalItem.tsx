import { StyleSheet, TouchableOpacity, TouchableOpacityProps} from "react-native";

export default function AppModalItem({
    children,
    onPress
}: TouchableOpacityProps) {
    return (
        <TouchableOpacity 
            style={styles.item}
            onPress={event => {
                if(onPress)
                    onPress(event)
            }}
        >
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 3,
        marginBottom: 3,
        borderRadius: 12
    }
})