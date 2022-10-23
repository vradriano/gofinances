import React, { useEffect, useState, useCallback } from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native';
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HistoryCard } from '../../components/HistoryCard'
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  LoadContainer
} from './styles'
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components/native'
import { useAuth } from '../../hooks/auth'

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const theme = useTheme()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([ ])

  function handleChangeDate (action: 'next' | 'prev') {
    setIsLoading(true)
    if(action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function LoadData() {
    const dataKey = `@gofinances:transactions_user:${user.id}`
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : []

    const expensives = responseFormatted
      .filter((expensive: TransactionData) => 
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    )
  
    const expensivesTotal = expensives.reduce((acc: number, expensive: TransactionData) => {
      return acc + Number(expensive.amount) 
    }, 0)

    const totalByCategory: CategoryData[] = []

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if(expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      })

      if(categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        })
      }
    })
    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useEffect(() => {
    LoadData()
  }, [selectedDate])

  useFocusEffect(useCallback(() => {
    LoadData()
  }, []))

  return (
    <Container>
        <Header>
          <Title> Resumo por categoria </Title>
        </Header>

        {
          isLoading ?
            <LoadContainer> 
              <ActivityIndicator 
                color={theme.colors.primary} 
                size='large' 
              />
            </LoadContainer> 
          :

        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            flex: 1,
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight() 
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleChangeDate('prev')}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              { format(selectedDate, 'MMMM, yyyy', { locale: ptBR})}
            </Month>

            <MonthSelectButton onPress={() => handleChangeDate('next')}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: { 
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape
                } 
              }}
              labelRadius={50}
              x='percent'
              y='total'
            />
          </ChartContainer>

          {
            totalByCategories.map(item => (
              <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            ))
          }
        </Content>
      }
    </Container>
  )
}
