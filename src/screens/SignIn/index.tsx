import React, { useContext, useState } from 'react'
import { ActivityIndicator, Platform, Alert } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import AppleSvg from '../../../assets/apple.svg'
import GoogleSvg from '../../../assets/google.svg'
import LogoSvg from '../../../assets/logo.svg'

import { useAuth } from '../../hooks/auth'
import { SignInSocialButton } from '../../components/SignInSocialButton'

import { useTheme } from 'styled-components'

import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithGoogle, signInWithApple } = useAuth()
  const theme = useTheme()

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true)
      return await signInWithGoogle()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possivel conectar a conta Google')
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true)
      return await signInWithApple()
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possivel conectar a conta Apple')
      setIsLoading(false)
    } 
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={RFValue(120)}
            height={RFValue(60)}
          />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>


        <SignInTitle>
          Faça eu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>

      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton 
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          
          {
            Platform.OS === 'ios' &&
            <SignInSocialButton 
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          }
        </FooterWrapper>
      </Footer>

      {
        isLoading && <ActivityIndicator color={theme.colors.shape} />
      }
    </Container>
  )
}