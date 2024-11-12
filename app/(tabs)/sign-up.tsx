import { StyleSheet, View, TouchableOpacity } from 'react-native';
import AppWrapper from '@/components/global/AppWrapper';
import Svg, {Path} from 'react-native-svg';
import { ThemedText } from '@/components/ThemedText';
import AppButton from '@/components/global/AppButton';
import AppInput from '@/components/global/AppInput';
import { useState } from 'react';
import AppCheckbox from '@/components/global/AppCheckbox';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { AppFetch } from '@/utils/AppFetch';
import { router } from 'expo-router';
import AppSoc from '@/components/auth/AppSoc';
import { COLOR_SUCCESS } from '@/constants/Colors';
import { getErrorStatus } from '@/utils/Functions';

export default function SignUp() {
  const [phone, setPhone] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [submit, setSubmit] = useState(false)
  const [errorPhone, setErrorPhone] = useState<boolean>(false)
  const [errorName, setErrorName] = useState<boolean>(false)
  const [errorPassword, setErrorPassword] = useState<boolean>(false)
  const [load, setLoad] = useState<boolean>(false)
  const [politic, setPolitic] = useState<boolean>(true)

  const validation= () => {
    if(phone.length > 0 && phone.length < 11) {
      if(!errorPhone)
        setErrorPhone(true)
    } else {
      if(errorPhone && !submit)
        setErrorPhone(false)
    }

    if(password.length > 0 && password.length < 3) {
      if(!errorPassword)
        setErrorPassword(true)
    } else {
      if(errorPassword && !submit)
        setErrorPassword(false)
    }

    if(name.length > 0 && name.length < 3) {
      if(!errorName)
        setErrorName(true)
    } else {
      if(errorName && !submit)
        setErrorName(false)
    }

    if(politic === false)
      return true

    if(phone.length < 11)
      return true

    if(password.length < 3)
      return true

    if(name.length < 3)
      return true


    return false
  }
  const registerHandler = async () => {
    if(!submit)
      setSubmit(true)

    setLoad(true)
    if(!validation()) {
      const data = new FormData
      data.append('name', name)
      data.append('phone', phone)
      data.append('password', password)

      if(errorPhone)
        setErrorPhone(false)

      if(errorPassword)
        setErrorPassword(false)

      if(errorName)
        setErrorName(false)

      const response = await AppFetch.post('signup', data)
      setLoad(false)
      if(response.status === 200) {
        setPassword('')
        setPhone('')
        setName('')
        Notifier.showNotification({
          title: 'Вы почти зарегистрировались!',
          description: 'Для подвтерждения личности мы отправили вам смс код',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'success'
          },
          containerStyle: {
            backgroundColor: COLOR_SUCCESS
          }
        })

        router.replace({
          pathname: '/(tabs)/enter-pass',
          params: {
            pathname: 'pathname',
            smscode: response.result
          }
        })
      } else {
        setErrorName(getErrorStatus('name', response))
        setErrorPassword(getErrorStatus('password', response))
        setErrorPhone(getErrorStatus('phone', response))
      }
    }
  }

  return (
    <AppWrapper>
      <View style={{...styles.wrap}}>
          <ThemedText type="title_1">
            Регистрация
          </ThemedText>
          <ThemedText>
            Для регистрации в приложении заполните все поля
          </ThemedText>
          <AppInput 
            placeholder='Имя Фамилия'
            error={errorName}
            value={name}
            onChangeText={(text) => {
              if(submit)
                setSubmit(false)
              setName(text)
            }}
          />
          <AppInput 
            placeholder='Номер телефона'
            error={errorPhone}
            phone={true}
            value={phone}
            onChangeText={(text) => {
              if(submit)
                setSubmit(false)
              setPhone(text)
            }}
          />
          <AppInput 
            placeholder='Пароль'
            error={errorPassword}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              if(submit)
                setSubmit(false)
              setPassword(text)
            }}
          />
      </View>
      <View style={styles.absolute}>
        <AppCheckbox 
          label={'Я принимаю политику конфиденциальности'}
          value={true}
          style={styles.check}
          onValueChange={(val) => {
            setPolitic(val)
          }}
        />
        <AppButton
          onPress={registerHandler}
          disabled={validation()}
          loading={load}
        >
          Зарегистрироваться
        </AppButton>
        <AppSoc />
      </View>
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  check: {
    flexDirection: 'column'
  },
  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    marginBottom: 30
  },
  wrap: {
    position: 'relative',
    paddingBottom: 220
  }
});