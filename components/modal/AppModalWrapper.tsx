import { useEffect, useRef } from "react";
import { Animated, Dimensions, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { ThemedText } from "../ThemedText";
import AppModalItem from "./AppModalItem";
import AppRadio from "../global/AppRadio";
import { COLOR_BACKGROUND, COLOR_CALENDAR_GREY, COLOR_GREEN, COLOR_GREY, COLOR_WEEK_GREY } from "@/constants/Colors";
import { ModalStoreType } from "@/types/ModalStoreType";
import { ModalStoreDataType } from "@/types/ModalStoreDataType";
import { closeModal, resetModal, setModalData, setModalValue } from "@/store/actions/modal";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";

LocaleConfig.locales['ua'] = {
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ],
    monthNamesShort: ['Янв.', 'Февр.', 'Март', 'Апр.', 'Maй', 'Июнь', 'Июль', 'Авг.', 'Сеп.', 'Окт.', 'Ноя.', 'Дек.'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вос.', 'Пон.', 'Вт.', 'Ср.', 'Чет.', 'Пят.', 'Суб.'],
    today: "Сегодня"
  };
  
LocaleConfig.defaultLocale = 'ua';
  

export default function AppModalWrapper() {
    const safe = useSafeAreaInsets()
    const dispatch: any = useDispatch()
    const {width, height} = Dimensions.get('window')
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const modalProps: ModalStoreType = useSelector((state: any) => state.modal)

    useEffect(() => {
        if(modalProps.isOpened) {
            setTimeout(() => {
                fadeIn()
            }, 100);
        } else {
            setTimeout(() => {
                fadeOut()
            }, 100);
        }
    }, [modalProps.isOpened])

    const fadeIn = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    const fadeOut = () => {
      // Will change fadeAnim value to 0 in 3 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    const removeChecking = () => {
        var cloneData = []
        if(Array.isArray(modalProps.data))
            cloneData = JSON.parse(JSON.stringify(modalProps.data))

        cloneData.map((item: ModalStoreDataType) => {
            item.checked = false
            return item
        })

        return cloneData
    }

    const applyData = async (check: boolean, index: number, item: ModalStoreDataType) => {
        const data: Array<ModalStoreDataType> = removeChecking()
        
        if(data[index])
            data[index].checked = check

        await dispatch(setModalData(data as any))
        await dispatch(setModalValue(modalProps.key, item.value))
        await dispatch(closeModal())
    }

    const getItem = (item: ModalStoreDataType, index: number) => {
        if(modalProps.type == 'radio') {
            return (
                <AppRadio
                    wrapStyle={styles.item}
                    label={item.name}
                    value={!!item.checked}
                    onValueChange={async check => {
                        applyData(check, index, item)
                    }}
                />
            )
        }

        if(modalProps.type == 'list') {
            return (
                <TouchableOpacity 
                    style={{...styles.item, ...styles.list}}
                    onPress={async () => {
                        applyData(true, index, item)
                    }}
                >
                    <ThemedText>
                        {item.name}
                    </ThemedText>
                </TouchableOpacity>
            )
        }

        return null
    }

    const clickOutsideHandler = () => {
        dispatch(closeModal())
        dispatch(resetModal(modalProps.key))
    }

    const getMaxHeight = () => {
        return height - (safe.top + safe.bottom + 95)
    }

    const getCurrentDate = () => {
        var val: any = {}
        if(typeof modalProps.dataSingle == 'string' && modalProps.dataSingle) {
            val[moment(modalProps.dataSingle).format('YYYY-MM-DD')] = {
                selected: true
            }
        }

        return val
    }

    return (
        <Animated.View
            style={[
                modalProps.isOpened ? styles.container : styles.hidden,
                {
                  opacity: fadeAnim
                },
            ]}>
                {modalProps.isOpened && <TouchableOpacity style={styles.outside} onPress={clickOutsideHandler}></TouchableOpacity>}
                {modalProps.isOpened && <View style={{...styles.wrap, marginTop: safe.top, paddingBottom: safe.bottom}}>
                    {modalProps.title && <View style={styles.title}>
                        <ThemedText
                            type="title_2"
                        >
                            {modalProps.title}
                        </ThemedText>
                    </View>}
                    <SafeAreaProvider>
                        <SafeAreaView style={{maxHeight: getMaxHeight()}}>
                            <ScrollView style={{maxHeight: getMaxHeight()}}>
                                {modalProps.data && Array.isArray(modalProps.data) && modalProps.data.map((item: ModalStoreDataType, index) => {
                                    return (
                                        <AppModalItem
                                            key={index}
                                        >
                                            {getItem(item, index)}
                                        </AppModalItem>
                                    )
                                })}

                                {modalProps.type === 'calendar' && <Calendar
                                  style={{
                                    height: 350,
                                  }}
                                  current={modalProps.dataSingle ? moment(modalProps.dataSingle).format('YYYY-MM-DD') : moment().add(1, 'days').format('YYYY-MM-DD')}
                                  selected={{
                                    backgroundColor: COLOR_GREEN
                                  }}
                                  firstDay={1}
                                  markingType={'custom'}
                                  markedDates={{...getCurrentDate()}}
                                  theme={{
                                    calendarBackground: COLOR_BACKGROUND,
                                    textSectionTitleColor: 'black',
                                    todayTextColor: COLOR_GREEN,
                                    dayTextColor: 'black',
                                    arrowColor: COLOR_GREEN,
                                    textDisabledColor: COLOR_CALENDAR_GREY,
                                    selectedDayBackgroundColor: COLOR_GREEN,
                                    selectedDayTextColor: 'white',
                                    textDayFontFamily: 'Inter',
                                    'stylesheet.calendar.main': {
                                        week: {
                                            marginTop: 20,
                                            flexDirection: 'row',
                                            justifyContent: 'space-around'
                                        },
                                        dayContainer: {
                                            width: 30,
                                            height: 30,
                                            borderRadius: 15
                                        }
                                    },
                                    'stylesheet.calendar.header': {
                                        monthText: {
                                            fontSize: 20,
                                            fontFamily: 'Inter',
                                            fontWeight: 'bold',
                                            color: 'black',
                                            margin: 10
                                        },
                                        monthContainer: {
                                            backgroundColor: COLOR_GREY
                                        },
                                        dayHeader: {
                                            color: 'black',
                                        },
                                        week: {
                                            marginTop: 7,
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            backgroundColor: COLOR_WEEK_GREY
                                        }
                                    },
                                    
                                  }}
                                  onDayPress={async (day: any) => {
                                    await dispatch(setModalValue(modalProps.key, day.dateString))
                                    await dispatch(closeModal())
                                  }}
                                />}

                            </ScrollView>
                        </SafeAreaView>
                    </SafeAreaProvider>
                </View>}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    list: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item: {
        marginTop: 20,
        marginBottom: 20
    },
    hidden: {
        height: 0
    },
    title: {
        paddingBottom: 20,
    },
    outside: {
        flex: 1
    },
    wrap: {
        paddingTop: 30,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: COLOR_BACKGROUND,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingLeft: 10,
        paddingRight: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        position: 'absolute', 
        left: 0, 
        top: 0, 
        width: '100%', 
        height: '100%'
    },
    fadingContainer: {

    }
})