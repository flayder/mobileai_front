import { StyleSheet, View } from 'react-native';
import AppWrapper from '@/components/global/AppWrapper';
import { ThemedText } from '@/components/ThemedText';
import AppButton from '@/components/global/AppButton';
import AppInput from '@/components/global/AppInput';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { DB } from '@/utils/db';
import { AppFetch } from '@/utils/AppFetch';
import { UserType } from '@/types/UserType';
import { useSelector } from 'react-redux';
import { Notifier, NotifierComponents } from 'react-native-notifier';

export default function RestorePass() {
  const localPars = useLocalSearchParams()
  const [password, setPass] = useState<string>('')
  const [load, setLoad] = useState<boolean>(false)
  const user: UserType = useSelector((state: any) => state.user.currentUser)

  const validation= () => {
    if(password === '')
      return true

    return false
  }

  useEffect(() => {
    (async () => {
      if(localPars?.token) {
        await DB.createOrUpdate('token', localPars.token as string)
        await DB.getOption('token')
      }
    })()
  }, [localPars?.token])

  const restoreHandler = async () => {
    setLoad(true)
    if(!validation()) {
      const data = new FormData
      data.append('password', password)

      const response = await AppFetch.postWithToken('restore_pass', data)
      
      if(response.status === 200) {
        setPass('')
        Notifier.showNotification({
          title: 'Пароль успешно изменен!',
          description: 'Теперь вы можете использовать новый пароль для входа!',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'success'
          }
        })
        
        if(!user?.id) {
          router.replace('/(tabs)/sign-in')
        }
      }
      setLoad(false)
    }
  }

  return (
    <AppWrapper>
      <View style={{...styles.wrap}}>
          <ThemedText type="title_1">
            Восстановить пароль
          </ThemedText>
          <ThemedText>
            Введите новый пароль
          </ThemedText>
          <AppInput 
            placeholder='Новый пароль'
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPass(text)}
          />
      </View>
      <View style={styles.absolute}>
        <AppButton
          disabled={validation()}
          loading={load}
          onPress={restoreHandler}
        >
          Восстановить
        </AppButton>
      </View>
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    marginBottom: 30
  },
  socBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    marginRight: 5
  },
  wrap: {
    position: 'relative',
    paddingBottom: 170
  }
});