import HeaderBackButton from '@/components/header/HeaderBackButton';
import Header from '@/components/header/Header';
import { COLOR_BACKGROUND } from '@/constants/Colors';
import { router, Tabs } from 'expo-router';
import TabBar from '@/components/tabbar/TabBar';
import AppProfileHeader from '@/components/header/AppProfileHeader';
import AppPropfileHeader from '@/components/header/AppProfileHeader';
import { useSelector } from 'react-redux';

export default function TabLayout() {
  const user = useSelector((state: any) => state.user.currentUser)
  return (
    <Tabs screenOptions={{ 
      tabBarStyle: {display: 'none'}, 
      headerStyle: {backgroundColor: COLOR_BACKGROUND},
      headerLeft() {
        return <HeaderBackButton 
            onPress={() => {
                router.replace('/')
            }}
        />
      },
      headerTitle: '',
      headerShadowVisible: false
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Start',
          headerShown: false
        }}
      />
      {/* <Tabs.Screen
        name="index"
        options={{
          title: 'Мой профиль',
          header(props) {
            return <Header color="green" props={props}>
              <AppPropfileHeader props={props} />
            </Header>
          },
        }}
      /> */}
      <Tabs.Screen
        name="sign-in"
        options={{
          title: 'Sign in',
        }}
      />
      <Tabs.Screen
        name="sign-up"
        options={{
          title: 'Sign up'
        }}
      />
      <Tabs.Screen
        name="forget-pass"
        options={{
          title: 'Forget password',
          headerLeft() {
            return <HeaderBackButton 
                onPress={() => {
                    router.replace('/(tabs)/sign-in')
                }}
            />
          },
        }}
      />
      <Tabs.Screen
        name="enter-pass"
        options={{
          title: 'Enter password',
          headerLeft() {
            return <HeaderBackButton 
                onPress={() => {
                    router.replace('/(tabs)/forget-pass')
                }}
            />
          },
        }}
      />
      <Tabs.Screen
        name="restore-pass"
        options={{
          title: 'Restore password',
          headerLeft() {
            return <HeaderBackButton 
                onPress={() => {
                  if(user?.id)
                    router.replace('/profile')
                  else
                    router.replace('/(tabs)/forget-pass')
                }}
            />
          },
        }}
      />
    </Tabs>
  );
}