import React from 'react';
import { HightlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetings,
  UserName,
  LogoutButton,
  Icon,
  HightlightCards,
  Transactions,
  Title,
  TransactionList
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de software",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '13/04/2022'
    },
    {
      id: '2',
      type: 'negative',
      title: "Outback",
      amount: "R$ 59,00",
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '13/04/2022'
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: 'Casa',
        icon: 'shopping-bag'
      },
      date: '13/04/2022'
    }
  ]

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


          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HightlightCards>
        <HightlightCard
          type='up'
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de agosto'
        />
        <HightlightCard
          type='down'
          title='Saídas'
          amount='R$ 1.259,00'
          lastTransaction='Última entrada dia 03 de agosto'
        />
        <HightlightCard
          type='total'
          title='Total'
          amount='R$ 16.141,00'
          lastTransaction='01 à 16 de agosto'
        />
      </HightlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          keyExtractor={item => item.id}
          data={data}
          renderItem={({ item }) =>  <TransactionCard data={item} /> }
        >
          
        </TransactionList>
      </Transactions>
    </Container>
  )
}