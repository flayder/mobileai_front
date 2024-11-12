import { Dimensions, StyleSheet, View } from 'react-native';
import AppWrapper from '@/components/global/AppWrapper';
import AppFakeSelect from '@/components/header/AppFakeSelect';
import { SexData } from '@/utils/DataApp';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, resetModal, setModalValue } from '@/store/actions/modal';
import { useEffect, useState } from 'react';
import { AppFetch } from '@/utils/AppFetch';
import { saveDataUser } from '@/store/actions/user';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { CityType } from '@/types/CityType';
import moment from 'moment';
import AppPlaceholderInput from '@/components/global/AppPlaceholderInput';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import AppPoll from '@/components/AppPoll';
import AppButton from '@/components/global/AppButton';
import Svg, {Path} from 'react-native-svg';
import { setTabBarActive } from '@/store/actions/interface';

export default function Profile() {
  const win = Dimensions.get('window').width - 15
  const user = useSelector((state: any) => state.user.currentUser)
  const [cities, setCities] = useState([])
  const value = useSelector((state: any) => state.modal.value)
  const dispatch: any = useDispatch()
  const sex = SexData

  useEffect(() => {
    (async () => {
      const response = await AppFetch.get('cities')
      if(response.status === 200 && Array.isArray(response.result)) {
        const cits: any = []
        response.result.map((city: CityType) => {
          cits.push({
            name: city.name,
            value: city.id
          })
        })
        setCities(cits)
      }
    })()
    dispatch(setTabBarActive('left'))
  }, [])

  const applyData = async (key: any = false) => {
    const data = new FormData
    var i = 0
    if(key && value && value[key]) {
      data.append(key, value[key])
      i++
    } else {
      for(let k in value) {
        data.append(k, value[k])
        i++
      }
    }
    if(i > 0) {
      const response = await AppFetch.postWithToken('save_user_data', data)
      console.log('response', response)
      if(response.status === 200) {
        dispatch(saveDataUser(data))
      }
      Notifier.showNotification({
        title: 'Данные успешно сохранены!',
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: 'success'
        }
      })
      dispatch(resetModal())
    }
  }

  useEffect(() => {
    (async () => {
      await applyData(value.key)
    })()
  }, [value])

  return (
    <AppWrapper>
      <AppFakeSelect 
        placeholder='Пол'
        value={user?.sex ?? 'Выберете свой пол'}
        onPress={() => {
            dispatch(openModal({
                key: 'sex',
                title: 'Выберите ваш пол',
                data: sex,
                type: 'list',
                dataSingle: user?.sex ?? null
            }))
        }}
      />
      <AppFakeSelect 
        placeholder='Город'
        value={user?.city?.id ? user.city.name : 'Выберете город'}
        onPress={() => {
            dispatch(openModal({
                key: 'city',
                title: 'Выберите город',
                data: cities,
                type: 'list',
                dataSingle: user?.city?.id ? user.city.id : null
            }))
        }}
      />

      <AppFakeSelect 
        placeholder='Дата рождения'
        value={user?.birthday ? moment(user.birthday).format('DD.MM.YYYY') : 'дд.мм.гг'}
        onPress={() => {
            dispatch(openModal({
                key: 'birthday',
                type: 'calendar',
                dataSingle: user?.birthday ?? null
            }))
        }}
      />
      <AppPlaceholderInput 
        placeholder='Ваше имя'
        value={user?.name}
        onBlur={async (text) => {
          await dispatch(setModalValue('name', text))
        }}
      />
      <AppPlaceholderInput 
        placeholder='Ваш рост'
        value={user?.height}
        onBlur={async (text) => {
          await dispatch(setModalValue('height', text))
        }}
      />

      <AppPlaceholderInput 
        placeholder='Ваш вес'
        value={user?.weight}
        onBlur={async (text) => {
          await dispatch(setModalValue('weight', text))
        }}
      />

      
      <Link href={'/(tabs)/restore-pass'}>
        <ThemedText fullScreen={true} type={'link'} style={{textAlign: 'right', }}>
          Забыли пароль? Сменить
        </ThemedText>
      </Link>
      <AppPoll />
      <AppButton style={styles.addBtn}>
        <View style={styles.add}>
          <ThemedText type='subhead' style={styles.addText}>
            Добавить пользователя
          </ThemedText>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path fillRule="evenodd" clipRule="evenodd" d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="white"/>
          </Svg>
        </View>
      </AppButton>
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    borderRadius: 8,
    marginBottom: 20
  },
  add: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addText: {
    color: 'white',
    paddingRight: 10,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: -3,
    marginRight: -3
  },
  block: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 10,
    padding: 10,
  },
  wrapStyle: {
    paddingTop: 0
  },
  img: {
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
    alignItems: 'center'
  },
  textBlock: {
    width: '100%'
  },
  subhead: {
    textAlign: 'center',
    marginBottom: 0
  },
  txt: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 0
  }
});