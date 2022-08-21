import React, { useState } from 'react';
import { Modal } from 'react-native';

import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles'

import { CategorySelect } from '../CategorySelect';

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const handleTransactionsTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>

        <Fields>
          <Input 
            placeholder="Nome"
          />
          <Input 
            placeholder="Preço"
          />

          <TransactionTypes>
            <TransactionTypeButton
              type='up' 
              title='Income'
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type='down' 
              title='Outcome' 
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionTypes>


          <CategorySelectButton 
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>

    </Container>
  )
}