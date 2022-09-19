import React, { useState } from "react";
import { useMutation } from '@apollo/client'
import { LOGIN } from '../utils/mutations';
import { useNavigate } from 'react-router-dom'
import Auth from '../utils/auth'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  Input,
  Button,
  Stack,
  useStatStyles,
  Box,
  Heading
} from "@chakra-ui/react";

export default function LoginForm() {
  const [formState, setFormState] = useState({ email: 'default', password: 'default' })
  const [login, { error }] = useMutation(LOGIN)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await login({
        variables: { ...formState }
      })
      console.log(data)
      Auth.login(data.login.token)
      navigate('/')
    } catch (err) {
      console.error(err)
    }

    setFormState({ email: '', password: '' })
  }

  return (
    <Box border='2px' pt='25px' pr='25px' pl='25px' borderColor='gray.200' >
    <form onSubmit={handleFormSubmit}>
      <FormControl isRequired >
      <Heading mb='20px'>Log In</Heading>
        <FormLabel htmlFor='emailField'>Email</FormLabel>
        <Input
        border='2px'
        mb='20px'
          name='email'
          id='emailField'
          type='email'
          onChange={handleChange}/>

        <FormLabel htmlFor='passwordField'>Password</FormLabel>
        <Input
        border='2px'
        name='password'
        id='passwordField'
        type='password' 
        onChange={handleChange}/>
      </FormControl>

      <Button
        type = 'submit'
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bg='red'
        my={5}
        href={'#'}
        _hover={{
          bg: 'brick_red',
        }}
      >
        Sign In!
      </Button>
    </form>
    </Box>
  )
}