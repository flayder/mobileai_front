import { StyleSheet, View } from 'react-native';
import AppWrapper from '@/components/global/AppWrapper';
import { ThemedText } from '@/components/ThemedText';
import AppImage from '@/components/global/AppImage';
import AppButton from '@/components/global/AppButton';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 1000);
  }, [])
  return (
    <AppWrapper withoutHeader={true}>
      <AppImage 
        fullWidth={true}
        style={styles.image}
        source={require('@/assets/images/start/first-screen.png')}
      />
      {delay && <>
        <View style={{marginTop: -100, marginBottom: 20}}>
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