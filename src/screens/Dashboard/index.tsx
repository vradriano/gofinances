import React from 'react';
import { HightlightCard } from '../../components/HighlightCard';
import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetings,
  UserName,
  Icon,
  HightlightCards
} from './styles'

export function Dashboard() {

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo 
              source={{ uri: 'https://avatars.githubusercontent.com/u/90075349?v=4' }} 
              
            />
            <User>
              <UserGreetings>Olá, </UserGreetings>
              <UserName>Vitor</UserName>
            </User>
          </UserInfo>

          <Icon  name="power" />
        </UserWrapper>

      </Header>

      <HightlightCards>
        <HightlightCard />
        <HightlightCard />
        <HightlightCard />
      </HightlightCards>
    </Container>
  )
}