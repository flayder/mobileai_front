import AppModalWrapper from '@/components/modal/AppModalWrapper';
import { COLOR_BACKGROUND } from '@/constants/Colors';
import useLoadApp from '@/hooks/useLoadApp';
import store from '@/store';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotifierWrapper } from 'react-native-notifier';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import * as Updates from 'expo-updates';
import { DB } from '@/utils/db';
import { AppFetch } from '@/utils/AppFetch';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoaded, setLoad] = useState(false)
  const [isAuth, setAuth] = useState(false)
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/Inter.ttf'),
    InterItalic: require('../assets/fonts/Inter-italic.ttf'),
  });

  useEffect(() => {
    (async () => {
      await DB.init()
      const token = await DB.getOption('token')
      if(token) {
        const response = await AppFetch.postWithToken('current_user')
        if(response.status === 200) {
          setAuth(true)
        } else {
          await DB.createOrUpdate('phone', '')
          await DB.createOrUpdate('password', '')
          await DB.createOrUpdate('token', '')
        }
      }
      setLoad(true)
    })()
  }, [])

  //const appLoaded = useLoadApp()

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  //useEffect(() => {
  //  onFetchUpdateAsync()
  //}, [])

  useEffect(() => {
    if (loaded && isLoaded) {
      SplashScreen.hideAsync()
      if(isAuth) {
        router.replace('/profile/main')
      }
    }
  }, [loaded, isLoaded, isAuth]);

  if (!loaded || !isLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <NotifierWrapper>
          <ThemeProvider value={DefaultTheme}>
            <Stack screenOptions={({headerStyle: {backgroundColor: COLOR_BACKGROUND}})}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="profile" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <AppModalWrapper />
          </ThemeProvider>
        </NotifierWrapper>
      </GestureHandlerRootView>
    </Provider>
  );
}
