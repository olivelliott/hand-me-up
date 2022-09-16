import React from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Stack,
} from "@chakra-ui/react";

export default function PasswordInput() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <Stack spacing={3}>
        <Input htmlSize={4} width='auto' placeholder='Username' />
        <Input
              mt={0}
              size="lg"
              type="email"
              placeholder="Enter your email..."
              required
            />
        <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter password' />
        {/* <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}> {show ? 'Hide' : 'Show'}</Button>
        </InputRightElement> */}
        </Stack>
      </InputGroup>
    )
  }