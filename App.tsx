import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';

import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './src/routes/app.routes';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme'


export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if(!fontsLoaded) {
    return null
  }

  SplashScreen.hideAsync();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StatusBar 
            barStyle='light-content'
          />
          <AppRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}
