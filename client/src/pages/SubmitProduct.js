import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client'
import { ADD_PRODUCT } from "../utils/mutations";
import Auth from '../utils/auth'
import Axios from 'axios'

import {
  Box,
  Text,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Image,
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
  Container,
} from '@chakra-ui/react'
import { QUERY_CATEGORIES } from "../utils/queries";

export default function SubmitProduct () {
  const [formState, setFormState] = useState({
    name: '',
    brand: '',
    size: '',
    description: '',
    image: '',
    quantity: '',
    price: 0,
    category: ''
  })

  const loggedIn = Auth.loggedIn()
  const navigate = useNavigate()
  const { data: categoryArray } = useQuery(QUERY_CATEGORIES)
  console.log('categories >>>', categoryArray)

  const [addProduct, { error }] = useMutation(ADD_PRODUCT)

  const handleChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target
      setFormState({ ...formState, [name]: value })
      console.log(formState)
  }

  const handleQuantityChange = (e) => {
    const count = parseInt(e)
    setFormState({ ...formState, quantity: count })
    console.log(formState)
  }

  const handlePriceChange = (e) => {
    const price = parseFloat(e.target.value)
    setFormState({ ...formState, price: price })
  }

  const handleSetCategory = (e) => {
    console.log(e.target.value)

    if (e.target.value === 'women') {
      setFormState({ ...formState, category: categoryArray.categories[0]._id })
    } else {
      setFormState({ ...formState, category: categoryArray.categories[1]._id })
    }
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]

    const formData = new FormData()
    formData.append("file", selectedImage)
    formData.append("upload_preset", "hmuuncfsbcproj3")

    Axios.post("https:/api.cloudinary.com/v1_1/dweqcfhdc/image/upload", formData)
      .then(res => {
        const imageUrl = res.data.url
        console.log("image now stored at ", imageUrl)
        setFormState({ ...formState, image: imageUrl })
      })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      await addProduct({
        variables: { ...formState }
      })
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      {loggedIn ? (
        <form onSubmit={handleFormSubmit}>
          <Text fontSize='4xl' as='b'>Submit a new item for sale!</Text>
          <FormControl mt='5' mb='2'>
            <FormLabel>Item Name</FormLabel>
            <Input
              type='text'
              name='name'
              onChange={handleChange}
              placeholder='Shirt' />
          </FormControl>

          <FormControl mb='2'>
            <FormLabel>Brand</FormLabel>
            <Input
              type='text'
              name='brand'
              onChange={handleChange}
              placeholder='Acme' />
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
                      type='number'
                      min="2.99"
                      step="0.01"
                      placeholder='Enter amount'
                      name='price'
                      onChange={handlePriceChange} />
                  </InputGroup>
                </Box>
                <Spacer />
                <Box width="20%">
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput
                    name='quantity'
                    onChange={handleQuantityChange}
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
              onChange={handleSetCategory}>
              <option value='men'>Men's</option>
              <option value='women'>Women's</option>
            </Select>
          </FormControl>

          <FormControl mb='10'>
            <FormLabel>Image</FormLabel>
            <Box boxSize='200px' mx='auto'>
              <Image src={formState.image} alt='product image' fallbackSrc='https://via.placeholder.com/200' boxSize='200px' mb='2' />
              <input type='file' onChange={handleImageChange}></input>
            </Box>
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
      ) : (
        <h1>You must be logged in to submit new items</h1>
      )}
    </Container>
  )
}