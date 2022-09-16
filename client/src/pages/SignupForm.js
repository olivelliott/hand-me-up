import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from '../utils/mutations'
import Auth from '../utils/auth'

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

    setFormState({
      ...formState,
      [name]: value,
    })
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

  // this error is for testing purposes. Replace with functioning error
  let isFirstNameError = false
  let isLastNameError = false
  let isEmailError = false
  let isPasswordError = false
  // ===============================================

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl isRequired>

        <FormLabel htmlFor='firstNameInput'>First Name</FormLabel>
        <Input
          type='text'
          name='firstName'
          id='firstNameInput'
          onChange={handleChange} />
        {!isFirstNameError &&
          <FormErrorMessage>First name is required. Please enter a name to continue.</FormErrorMessage>
        }

        <FormLabel>Last Name</FormLabel>
        <Input
          type='text'
          name='lastName'
          onChange={handleChange} />
        {!isLastNameError &&
          <FormErrorMessage>Last name is required. Please enter a name to continue.</FormErrorMessage>
        }

        <FormLabel>Email address</FormLabel>
        <Input
          type='email'
          name='email'
          onChange={handleChange} />
        {!isEmailError ? (
          <FormHelperText textAlign="left">We'll never share your email.</FormHelperText>
        ) : (
            <FormErrorMessage>Email is required. Please enter a valid email to continue.</FormErrorMessage>
        )}

        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          name='password'
          onChange={handleChange} />
        {!isPasswordError &&
          <FormErrorMessage>Last name is required. Please enter a password to continue.</FormErrorMessage>
        }
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