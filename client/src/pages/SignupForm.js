import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  Input,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function SignupForm() {
  // const [show, setShow] = React.useState(false)
  // const handleClick = () => setShow(!show)

  // this error is for testing purposes. Replace with functioning error
  let isFirstNameError = false
  let isLastNameError = false
  let isEmailError = false
  let isPasswordError = false

  return (
    <form>
      <FormControl isRequired>

        <FormLabel>First Name</FormLabel>
        <Input type='text' />
        {!isFirstNameError &&
          <FormErrorMessage>First name is required. Please enter a name to continue.</FormErrorMessage>
        }

        <FormLabel>Last Name</FormLabel>
        <Input type='text' />
        {!isLastNameError &&
          <FormErrorMessage>Last name is required. Please enter a name to continue.</FormErrorMessage>
        }

        <FormLabel>Email address</FormLabel>
        <Input type='email' />
        {!isEmailError ? (
          <FormHelperText textAlign="left">We'll never share your email.</FormHelperText>
        ) : (
            <FormErrorMessage>Email is required. Please enter a valid email to continue.</FormErrorMessage>
        )}

        <FormLabel>Password</FormLabel>
        <Input type='password' />
        {!isPasswordError &&
          <FormErrorMessage>Last name is required. Please enter a password to continue.</FormErrorMessage>
        }
      </FormControl>

      <Button
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