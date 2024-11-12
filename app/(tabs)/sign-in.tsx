import { StyleSheet, View, TouchableOpacity } from 'react-native';
import AppWrapper from '@/components/global/AppWrapper';
import Svg, {Path} from 'react-native-svg';
import { ThemedText } from '@/components/ThemedText';
import AppButton from '@/components/global/AppButton';
import AppInput from '@/components/global/AppInput';
import { Link, router } from 'expo-router';
import { COLOR_GREEN, COLOR_SUCCESS } from '@/constants/Colors';
import { useState } from 'react';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { AppFetch } from '@/utils/AppFetch';
import { DB } from '@/utils/db';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '@/store/actions/user';
import AppSoc from '@/components/auth/AppSoc';
import { getErrorStatus } from '@/utils/Functions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SignIn() {
  const safe = useSafeAreaInsets()
  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorPhone, setErrorPhone] = useState<boolean>(false)
  const [errorPassword, setErrorPassword] = useState<boolean>(false)
  const [submit, setSubmit] = useState(false)
  const [load, setLoad] = useState<boolean>(false)
  const dispatch: any = useDispatch()

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

    if(phone.length < 11) {
      return true
    }

    if(password.length < 3) {
      return true
    }

    return false
  }

  const signHandler = async () => {
    if(!submit)
      setSubmit(true)

    setLoad(true)
    if(!validation()) {
      const data = new FormData
      data.append('phone', phone)
      data.append('password', password)

      const response = await AppFetch.post('signin', data)

      if(errorPhone)
        setErrorPhone(false)

      if(errorPassword)
        setErrorPassword(false)

      if(response.status === 200) {
        
        await DB.createOrUpdate('token', response.result)
        await DB.createOrUpdate('phone', phone)
        await DB.createOrUpdate('password', password)

        await dispatch(getCurrentUser())
        setPassword('')
        setPhone('')
        
        Notifier.showNotification({
          title: 'Успешная авторизация!',
          description: 'Вы успешно авторизовались!',
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'success'
          },
          containerStyle: {
            backgroundColor: COLOR_SUCCESS
          }
        })
        
        router.replace('/profile/main')
      } else {
        setErrorPassword(getErrorStatus('password', response))
        setErrorPhone(getErrorStatus('phone', response))
      }
      setLoad(false)
    }
  }

  return (
    <AppWrapper>
      <View style={{...styles.wrap, paddingBottom: safe.bottom}}>
          <ThemedText type="title_1">
            Вход
          </ThemedText>
          <ThemedText>
            С возвращением! Для входа в приложение введите логин и пароль
          </ThemedText>
          <AppInput 
            placeholder='Телефон'
            phone={true}
            value={phone}
            error={errorPhone}
            onChangeText={(text) => {
              if(submit)
                setSubmit(false)
              setPhone(text)
            }}
            onBlur={() => {
              if(errorPhone)
                setErrorPhone(false)
            }}
          />
          <AppInput 
            placeholder='Пароль'
            secureTextEntry={true}
            value={password}
            error={errorPassword}
            onChangeText={(text) => {
              if(submit)
                setSubmit(false)
              setPassword(text)
            }}
            onBlur={() => {
              if(errorPassword)
                setErrorPassword(false)
            }}
          />
          <View style={styles.fogetLink}>
            <Link href={'/(tabs)/forget-pass'} style={{textAlign: 'right'}}>
              <ThemedText type="subhead" style={{ color: COLOR_GREEN}}>
                Забыли пароль?
              </ThemedText>
            </Link>
          </View>
      </View>
      <View style={styles.absolute}>
        <AppButton
          disabled={validation()}
          loading={load}
          onPress={signHandler}
        >
          Войти
        </AppButton>
        <AppSoc />
        <View style={styles.link}>
          <Link href={'/(tabs)/sign-up'} style={{textAlign: 'center'}}>
            <ThemedText type='subhead' style={{color: COLOR_GREEN}}>
              Нет аккаунта? Зарегистрируйстесь
            </ThemedText>
          </Link>
        </View>
      </View>
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  fogetLink: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  link: {
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center'
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
    paddingBottom: 170
  }
});