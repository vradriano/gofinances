import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  TouchableWithoutFeedback 
} from 'react-native';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles'

import { CategorySelect } from '../CategorySelect';

interface FormData {
  [key: string]: any;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor número')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório')
})

export function Register() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const handleTransactionsTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type)
  }

  function handleRegister(form: FormData) {
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação')

    if(category.key === undefined) {
      return Alert.alert('Selecione a categoria')
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data)
    
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>

          <Fields>
            <InputForm
              name='name'
              control={control} 
              placeholder="Nome"
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name?.message}
            />

            <InputForm
              name='amount'
              control={control} 
              placeholder="Preço"
              keyboardType='numeric'
              error={errors.name?.message}
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

          <Button 
            title="Enviar" 
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}