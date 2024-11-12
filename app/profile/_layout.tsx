import AppPropfileHeader from '@/components/header/AppProfileHeader';
import AppSlider from '@/components/header/AppSlider';
import Header from '@/components/header/Header';
import TabBar from '@/components/tabbar/TabBar';
import { COLOR_BACKGROUND } from '@/constants/Colors';
import { getCurrentUser } from '@/store/actions/user';
import { UserType } from '@/types/UserType';
import { DB } from '@/utils/db';
import { router, Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
export default function ProfileTabLayout() {
    const user: UserType | null = useSelector((state: any) => state.user.currentUser)
    const dispatch: any = useDispatch()
    const [tryAuth, setTry] = useState(false)

    useEffect(() => {
        setTimeout(async () => {
          const token = await DB.getOption('token')
            if(!user?.id && !token || !user?.id && token && tryAuth) {
              await DB.createOrUpdate('phone', '')
              await DB.createOrUpdate('password', '')
              await DB.createOrUpdate('token', '')
              router.replace('/(tabs)/sign-in')
            } else if(!user?.id && token) {
              setTry(true)
              await dispatch(getCurrentUser())
            }
        }, 100);
    }, [user?.id])
        
    return (
      <Tabs screenOptions={{ 
        headerStyle: {backgroundColor: COLOR_BACKGROUND}
      }}
      tabBar={(props) => {
        return <TabBar />
      }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Мой профиль',
            header(props) {
              return <Header color="green" props={props}>
                <AppPropfileHeader props={props} />
              </Header>
            },
          }}
        />
        <Tabs.Screen
          name="main"
          options={{
            title: 'Главная страница',
            header(props) {
              return <Header props={props}>
                
              </Header>
            },
          }}
        />
      </Tabs>
      
    );
  }