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
} from "@chakra-ui/react";

export default function LoginForm() {
    // const [show, setShow] = React.useState(false)
    // const handleClick = () => setShow(!show)
  
    return (
      <form>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' />

          <FormLabel>Password</FormLabel>
          <Input type='password' />
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
          Sign In!
        </Button>
      </form>
    )
  }