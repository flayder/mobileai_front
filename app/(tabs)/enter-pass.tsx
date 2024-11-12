import { StyleSheet, View } from 'react-native';
import AppWrapper from '@/components/global/AppWrapper';
import { ThemedText } from '@/components/ThemedText';
import AppButton from '@/components/global/AppButton';
import AppInput from '@/components/global/AppInput';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { AppFetch } from '@/utils/AppFetch';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { getErrorStatus } from '@/utils/Functions';
import { DB } from '@/utils/db';

export default function ForgetPass() {
  const localPars = useLocalSearchParams()
  const [pincode, setPincode] = useState<string>('')
  const [load, setLoad] = useState<boolean>(false)
  const [errorPincode, setErrorPincode] = useState<boolean>(false)
  const [submit, setSubmit] = useState(false)

  useEffect(() => {
    if(localPars?.smscode) {
      setPincode(localPars.smscode as string)
    }
  }, [localPars?.smscode])

  const validation= () => {
    if(pincode.length > 0 && pincode.length < 4) {
      if(!errorPincode)
        setErrorPincode(true)
    } else {
      if(errorPincode && !submit)
        setErrorPincode(false)
    }

    if(pincode.length < 4)
      return true

    return false
  }

  const forgetHandler = async () => {
    if(!submit)
      setSubmit(true)

    setLoad(true)
    if(!validation()) {
      const data = new FormData
      data.append('pincode', pincode)

      const response = await AppFetch.post('enter_pincode', data)
      
      if(response.status === 200) {
        setPincode('')
        Notifier.showNotification({
          title: 'Ваша личность подтверждена!',
          description: localPars?.pathname ? 'Теперь вы можете авторизоваться на сайт' : 'Теперь можете задать новый пароль!',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'success'
          }
        })

        if(localPars?.pathname) {
          await DB.createOrUpdate('token', response.result)
        }
        
        router.replace({
          pathname: localPars?.pathname ? '/profile/main' : '/(tabs)/restore-pass' as any,
          params: {
            token: response.result
          }
        })
      } else {
        setErrorPincode(getErrorStatus('pincode', response))
      }
      setLoad(false)
    }
  }

  return (
    <AppWrapper>
      <View style={{...styles.wrap}}>
          <ThemedText type="title_1">
            Введите пароль из смс
          </ThemedText>
          <ThemedText>
            Мы отправили пароль смс, его нужно ввести чтобы подтвердить вашу личность
          </ThemedText>
          <AppInput 
            placeholder='Пароль из смс'
            error={errorPincode}
            value={pincode}
            onChangeText={(text) => {
              if(submit)
                setSubmit(false)
              setPincode(text)
            }}
          />
      </View>
      <View style={styles.absolute}>
        <AppButton
          disabled={validation()}
          loading={load}
          onPress={forgetHandler}
        >
          Отправить
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