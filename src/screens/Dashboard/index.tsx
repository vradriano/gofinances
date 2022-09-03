import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
  TransactionList,
  LoadContainer
} from './styles'
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

  const theme = useTheme()
  
  function getLastTransactionDate(
    collection: DataListProps[], 
    type: 'positive' | 'negative'
  ) {

    const lastTransaction = new Date(
      Math.max.apply(Math, collection
      .filter((transaction) => transaction.type === type)
      .map((transaction) => new Date(transaction.date).getTime())));
  
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
  }

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {

        if(item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }

        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date))

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date 
        }
      }
    )

      setTransactions(transactionsFormatted)

      const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
      const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
      const totalInterval = `01 a ${lastTransactionExpensives}`


      const total = entriesTotal - expensiveTotal

      const lastTransactionsEntries = 
        Math.max.apply(Math, transactions
        .filter((transaction : DataListProps) => transaction.type === 'positive')
        .map((transaction : DataListProps) => new Date(transaction.date).getTime())       
      );

      setHighLightData({
        entries: {
          amount: entriesTotal.toLocaleString("pt-BR", {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
        },
        expensives: {
          amount: expensiveTotal.toLocaleString("pt-BR", {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: `Última saida dia ${lastTransactionExpensives}`
        },
        total: {
          amount: total.toLocaleString("pt-BR", {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: totalInterval
        }
      })

      setIsLoading(false)
    }

  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return (
    <Container>
      {
        isLoading ? 
        <LoadContainer> 
          <ActivityIndicator 
            color={theme.colors.primary} 
            size='large' 
          />
        </LoadContainer> : 
        <>
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
            amount={highlightData.entries.amount}
            lastTransaction={highlightData.entries.lastTransaction}
          />
          <HightlightCard
            type='down'
            title='Saídas'
            amount={highlightData.expensives.amount}
            lastTransaction={highlightData.expensives.lastTransaction}
          />
          <HightlightCard
            type='total'
            title='Total'
            amount={highlightData.total.amount}
            lastTransaction={highlightData.total.lastTransaction}
          />
        </HightlightCards>

        <Transactions>
          <Title>Listagem</Title>

          <TransactionList
            keyExtractor={item => item.id}
            data={transactions}
            renderItem={({ item }) =>  <TransactionCard data={item} /> }
          >
            
          </TransactionList>
        </Transactions>
      </>
      }
    </Container>
  )
}