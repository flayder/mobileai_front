import { StyleSheet, View } from 'react-native';
import AppWrapper from '@/components/global/AppWrapper';
import { ThemedText } from '@/components/ThemedText';
import AppImage from '@/components/global/AppImage';
import AppButton from '@/components/global/AppButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const safe = useSafeAreaInsets()
  const [delay, setDelay] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
      console.log('here')
    }, 1000);
  }, [])
  return (
    <AppWrapper withoutHeader={true} style={{marginBottom: safe.bottom}}>
      <AppImage 
        fullWidth={true}
        style={styles.image}
        source={require('@/assets/images/start/first-screen.png')}
      />
      {delay && <>
        <View style={{marginTop: -120, marginBottom: 20}}>
          <ThemedText type="title_1">
              Добро пожаловать!
          </ThemedText>
          <ThemedText>
              Мы рады приветствовать вас в нашем приложении.
          </ThemedText>
      </View>
      <AppButton route={'/(tabs)/sign-in'}>
        Войти
      </AppButton>
      <AppButton color='white' route={'/(tabs)/sign-up'}>
        Зарегистрироваться
      </AppButton>
      </>}
    </AppWrapper>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: -50
  }
});