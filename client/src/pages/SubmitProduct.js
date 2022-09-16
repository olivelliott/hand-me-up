import React from "react";

import {
  Box,
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
} from '@chakra-ui/react'
import { Form } from "react-router-dom";

export default function SubmitProduct () {
  return (
    <form>
      <FormControl mb='2'>
        <FormLabel>Item Name</FormLabel>
        <Input type='text' placeholder='Shirt'/>
      </FormControl>

      <FormControl mb='2'>
        <FormLabel>Brand</FormLabel>
        <Input type='text' placeholder='Acme'/>
      </FormControl>

      <FormControl mb='2'>
        <FormLabel>Size</FormLabel>
        <Select placeholder='choose a size'>
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
                <Input placeholder='Enter amount' />
              </InputGroup>
            </Box>
            <Spacer />
            <Box width="20%">
              <FormLabel>Quantity</FormLabel>
              <NumberInput defaultValue={0} min={1}>
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
        <Select placeholder='choose a category'>
          <option value='men'>Men's</option>
          <option value='women'>Women's</option>
        </Select>
      </FormControl>

    </form>
  )
}