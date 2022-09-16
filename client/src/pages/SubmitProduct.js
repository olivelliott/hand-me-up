import React, { useState } from "react";
import { useMutation } from '@apollo/client'
import { ADD_PRODUCT } from "../utils/mutations";
import Auth from '../utils/auth'

import {
  Box,
  Text,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from '@chakra-ui/react'
import { Form } from "react-router-dom";

export default function SubmitProduct () {
  const [formState, setFormState] = useState({
    name: '',
    brand: '',
    size: '',
    description: '',
    image: 'null',
    quantity: '',
    price: '',
    category: ''
  })

  const [addProduct, { error }] = useMutation(ADD_PRODUCT)

  const handleChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target
      setFormState({ ...formState, [name]: value })
      console.log(formState)
  }

  const handleCountChange = (e) => {
    setFormState({ ...formState, quantity: e })
    console.log(formState)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await addProduct({
        variables: { ...formState }
      })
      console.log(data)
      Auth.login(data.user.token)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form>
      <Text fontSize='4xl' as='b'>Submit a new item for sale!</Text>
      <FormControl mt='5' mb='2'>
        <FormLabel>Item Name</FormLabel>
        <Input
          type='text'
          name='name'
          onChange={handleChange}
          placeholder='Shirt'/>
      </FormControl>

      <FormControl mb='2'>
        <FormLabel>Brand</FormLabel>
        <Input
          type='text'
          name='brand'
          onChange={handleChange}
          placeholder='Acme'/>
      </FormControl>

      <FormControl mb='2'>
        <FormLabel>Size</FormLabel>
        <Select 
          placeholder='choose a size'
          name='size'
          onChange={handleChange}>
          <option value='xs'>XS</option>
          <option value='s'>S</option>
          <option value='m'>M</option>
          <option value='lg'>LG</option>
          <option value='xl'>XL</option>
          <option value='xxl'>XXL</option>
          <option value='xxxl'>XXXL</option>
        </Select>
      </FormControl>

      <FormControl mb='2'>
        <FormLabel>Description</FormLabel>
        <Textarea
          name="description"
          onChange={handleChange}
          placeholder="Please describe the item, it's features, and it's condition"></Textarea>
      </FormControl>

      <FormControl mb='2'>
        <Box>
          <Flex >
            <Box width="79%">
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.300'
                  fontSize='1.2em'
                  children='$'
                />
                <Input
                  placeholder='Enter amount'
                  name='price'
                  onChange={handleChange}/>
              </InputGroup>
            </Box>
            <Spacer />
            <Box width="20%">
              <FormLabel>Quantity</FormLabel>
              <NumberInput
                name='quantity'
                onChange={handleCountChange}
                defaultValue={0}
                min={1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Flex>
        </Box>
      </FormControl>

      <FormControl mb='2'>
        <FormLabel>Category</FormLabel>
        <Select
          placeholder='choose a category'
          name='category'
          onChange={handleChange}>
          <option value='men'>Men's</option>
          <option value='women'>Women's</option>
        </Select>
      </FormControl>

      <Button
        type='submit'
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bg={'#0A9396'}
        my={5}
        href={'#'}
        _hover={{
          bg: '#001219',
        }}
      >Submit this item</Button>
    </form>
  )
}