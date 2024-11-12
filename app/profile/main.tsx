import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppWrapper from '@/components/global/AppWrapper';
import { ThemedText } from '@/components/ThemedText';
import AppImage from '@/components/global/AppImage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTabBarActive } from '@/store/actions/interface';
import AppSlider from '@/components/header/AppSlider';


export default function Main() {
  const win = Dimensions.get('window').width - 15
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(setTabBarActive('center'))
  }, [])
  const blockWidth = win / 2 - 10
  return (
    <AppWrapper>
      <AppSlider />
      <View style={styles.wrap}>
        <TouchableOpacity style={{...styles.block, width: blockWidth}}>
            <View style={styles.img}>
                <AppImage
                    source={require('@/assets/images/profile/history.png')}
                />
            </View>
            <View style={styles.textBlock}>
                <ThemedText type='subhead' style={styles.subhead}>
                    История
                </ThemedText>
                <ThemedText wrapStyle={styles.wrapStyle} style={styles.txt}>
                    История болезней
                </ThemedText>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.block, width: blockWidth}}>
            <View style={styles.img}>
                <AppImage
                    source={require('@/assets/images/profile/des.png')}
                />
            </View>
            <View style={styles.textBlock}>
                <ThemedText type='subhead' style={styles.subhead}>
                    Заболевания
                </ThemedText>
                <ThemedText wrapStyle={styles.wrapStyle} style={styles.txt}>
                    Справочник болезней
                </ThemedText>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.block, width: blockWidth}}>
            <View style={styles.img}>
                <AppImage
                    source={require('@/assets/images/profile/pill.png')}
                />
            </View>
            <View style={styles.textBlock}>
                <ThemedText type='subhead' style={styles.subhead}>
                    Лекарства
                </ThemedText>
                <ThemedText wrapStyle={styles.wrapStyle} style={styles.txt}>
                    Справочник лекарств
                </ThemedText>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.block, width: blockWidth}}>
            <View style={styles.img}>
                <AppImage
                    source={require('@/assets/images/profile/helper.png')}
                />
            </View>
            <View style={styles.textBlock}>
                <ThemedText type='subhead' style={styles.subhead}>
                    Помощник
                </ThemedText>
                <ThemedText wrapStyle={styles.wrapStyle} style={styles.txt}>
                    Определение болезни по симптомам
                </ThemedText>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.block, width: blockWidth}}>
            <View style={styles.img}>
                <AppImage
                    source={require('@/assets/images/profile/not.png')}
                />
            </View>
            <View style={styles.textBlock}>
                <ThemedText type='subhead' style={styles.subhead}>
                    Уведомления
                </ThemedText>
                <ThemedText wrapStyle={styles.wrapStyle} style={styles.txt}>
                    События, анализы, результаты
                </ThemedText>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.block, width: blockWidth}}>
            <View style={styles.img}>
                <AppImage
                    source={require('@/assets/images/profile/med.png')}
                />
            </View>
            <View style={styles.textBlock}>
                <ThemedText type='subhead' style={styles.subhead}>
                    Мед. Учреждения
                </ThemedText>
                <ThemedText wrapStyle={styles.wrapStyle} style={styles.txt}>
                    Аптеки и больницы
                </ThemedText>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.block, width: blockWidth}}>
            <View style={styles.img}>
                <AppImage
                    source={require('@/assets/images/profile/amb.png')}
                />
            </View>
            <View style={styles.textBlock}>
                <ThemedText type='subhead' style={styles.subhead}>
                    Моя аптечка
                </ThemedText>
                <ThemedText wrapStyle={styles.wrapStyle} style={styles.txt}>
                    Ваши лекарства
                </ThemedText>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.block, width: blockWidth}}>
            <View style={styles.img}>
                <AppImage
                    source={require('@/assets/images/profile/doc.png')}
                />
            </View>
            <View style={styles.textBlock}>
                <ThemedText type='subhead' style={styles.subhead}>
                    Запись к врачу
                </ThemedText>
                <ThemedText wrapStyle={styles.wrapStyle} style={styles.txt}>
                    Ваши записи на прием к врачу
                </ThemedText>
            </View>
        </TouchableOpacity>
      </View>
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5
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