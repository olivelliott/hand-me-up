import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from '../utils/mutations'
import Auth from '../utils/auth'
import { validateEmail } from '../utils/helpers'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";

export default function SignupForm() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [addUser, { error }] = useMutation(ADD_USER)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormState({ ...formState, [name]: value })
    }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await addUser({
        variables: { ...formState }
      })
      console.log(data)
      Auth.login(data.addUser.token)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl isRequired>

        <FormLabel htmlFor='firstNameField'>First Name</FormLabel>
        <Input
          type='text'
          name='firstName'
          id='firstNameField'
          onChange={handleChange} />

        <FormLabel htmlFor='lastNameField'>Last Name</FormLabel>
        <Input
          type='text'
          name='lastName'
          id='lastNameField'
          onChange={handleChange} />

        <FormLabel htmlFor='emailField'>Email address</FormLabel>
        <Input
          type='email'
          name='email'
          id='emailField'
          onChange={handleChange} />
          <FormHelperText textAlign="left">We'll never share your email.</FormHelperText>

        <FormLabel htmlFor='passwordField'>Password</FormLabel>
        <Input
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
  )
}