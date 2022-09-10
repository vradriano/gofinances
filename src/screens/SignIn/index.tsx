import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import AppleSvg from '../../../assets/apple.svg'
import GoogleSvg from '../../../assets/google.svg'
import LogoSvg from '../../../assets/logo.svg'

import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer
} from './styles'

export function SignIn() {

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

      <Footer />

    </Container>
  )
}