import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import AppFakeSelect from "./AppFakeSelect";
import { UserType } from "@/types/UserType";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/actions/modal";
import { useState } from "react";

type AppSearchProps = {
    props: any
}

export default function AppPropfileHeader({
    props
}: AppSearchProps) {
    const [choice, setChoice] = useState('1')
    const user: UserType = useSelector((state: any) => state.user.currentUser)
    const value: any = useSelector((state: any) => state.modal.value)
    const dispatch: any = useDispatch()
    return (
        <View style={styles.wrap}>
            <ThemedText wrapStyle={{marginBottom: 5}} type="title_1" style={styles.title}>
                {props.options.title}
            </ThemedText>
            <AppFakeSelect 
                placeholder="Учетная запись"
                value={user?.name ? user.name : user?.phone}
                onPress={() => {
                    if(value?.profile)
                        setChoice(value.profile)
                    
                    dispatch(openModal({
                        title: 'Учетная запись',
                        dataSingle: choice,
                        data: [{
                            name: 'Test 1',
                            value: '1'
                        }, {
                            name: 'Test 2',
                            value: '2'
                        }, {
                            name: 'Test 2',
                            value: '3'
                        }],
                        type: 'radio',
                        key: 'profile'
                    }))
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        paddingTop: 10
    },
    title: {
        color: 'white'
    }
})