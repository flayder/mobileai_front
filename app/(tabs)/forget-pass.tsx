import { StyleSheet, View } from 'react-native';
import AppWrapper from '@/components/global/AppWrapper';
import { ThemedText } from '@/components/ThemedText';
import AppButton from '@/components/global/AppButton';
import AppInput from '@/components/global/AppInput';
import { router } from 'expo-router';
import { useState } from 'react';
import { AppFetch } from '@/utils/AppFetch';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { getErrorStatus } from '@/utils/Functions';

export default function ForgetPass() {
  const [phone, setPhone] = useState<string>('')
  const [load, setLoad] = useState<boolean>(false)
  const [errorPhone, setErrorPhone] = useState<boolean>(false)
  const [submit, setSubmit] = useState(false)

  const validation= () => {
    if(phone.length > 0 && phone.length < 11) {
      if(!errorPhone)
        setErrorPhone(true)
    } else {
      if(errorPhone && !submit)
        setErrorPhone(false)
    }
    if(phone.length < 11) {
      return true
    }

    return false
  }

  const forgetHandler = async () => {
    if(!submit)
      setSubmit(true)
    setLoad(true)
    if(!validation()) {
      const data = new FormData
      data.append('phone', phone)

      const response = await AppFetch.post('forget_pass', data)
      
      if(response.status === 200) {
        setPhone('')
        Notifier.showNotification({
          title: 'Успешная отправка сообщения!',
          description: 'На указанные номер был отправлен код подтверждения!',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'success'
          }
        })
        
        router.replace({
          pathname: '/(tabs)/enter-pass',
          params: {
            smscode: response.result
          }
        })
      } else {
        setErrorPhone(getErrorStatus('phone', response))
      }
      setLoad(false)
    }
  }

  return (
    <AppWrapper>
      <View style={{...styles.wrap}}>
          <ThemedText type="title_1">
            Забыли пароль?
          </ThemedText>
          <ThemedText>
            Введите телефон для восстановления пароля. На этот телефон будет выслан код.
          </ThemedText>
          <AppInput 
            placeholder='Телефон'
            error={errorPhone}
            phone={true}
            value={phone}
            onChangeText={(text) => {
              if(submit)
                setSubmit(false)
              setPhone(text)
            }}
          />
      </View>
      <View style={styles.absolute}>
        <AppButton
          disabled={validation()}
          loading={load}
          onPress={forgetHandler}
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