import * as SplashScreen from 'expo-splash-screen';
import { Dashboard } from './src/screens/Dashboard';
import { Register } from './src/screens/Register'
import { CategorySelect } from './src/screens/CategorySelect'
import { ThemeProvider } from 'styled-components/native';
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
    <ThemeProvider theme={theme}>
      <CategorySelect />
    </ThemeProvider>
  )
}
