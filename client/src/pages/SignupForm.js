import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from '../utils/mutations'
import { useNavigate } from 'react-router-dom'
import Auth from '../utils/auth'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Box,
  Heading
} from "@chakra-ui/react";

export default function SignupForm() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [addUser, { error }] = useMutation(ADD_USER)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormState({ ...formState, [name]: value })
    console.log(formState)
    }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await addUser({
        variables: { ...formState }
      })
      console.log('try add user >>>', data)
      console.log(data)
      Auth.login(data.addUser.token)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box border='2px' pt='25px' pr='25px' pl='25px' borderColor='gray.200' >
    <form onSubmit={handleFormSubmit}>
      <FormControl isRequired>
      <Heading mb='20px'>Create an Account</Heading>
        <FormLabel htmlFor='firstNameField'>First Name</FormLabel>
        <Input
          border='2px'
          mb='20px'
          type='text'
          name='firstName'
          id='firstNameField'
          onChange={handleChange} />

        <FormLabel htmlFor='lastNameField'>Last Name</FormLabel>
        <Input
          border='2px'
          mb='20px'
          type='text'
          name='lastName'
          id='lastNameField'
          onChange={handleChange} />

        <FormLabel htmlFor='emailField'>Email address</FormLabel>
        <Input
          border='2px'
          mb='20px'
          type='email'
          name='email'
          id='emailField'
          onChange={handleChange} />

        <FormLabel htmlFor='passwordField'>Password</FormLabel>
        <Input
          border='2px'
          type='password'
          name='password'
          id='passwordField'
          onChange={handleChange} />
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
        >
        Create My Account!
      </Button>
    </form>
    </Box>
  )
}