import React from "react";
import {
  InputGroup,
  Input,
//   InputRightElement,
  Button,
  Stack,
} from "@chakra-ui/react";

export default function Form() {
    // const [show, setShow] = React.useState(false)
    // const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <Stack spacing={3}>
        <Input htmlSize={4} width='auto' placeholder='Username' />
        <Input pr='4.5rem' placeholder='Enter password' />
        {/* <Input pr='4.5rem' type={show ? 'text' : 'password'} placeholder='Enter password' /> */}
        {/* <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}> {show ? 'Hide' : 'Show'}</Button>
        </InputRightElement> */}
          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'#0A9396'}
            href={'#'}
            _hover={{
              bg: '#001219',
            }}
          >
            Sign In!
          </Button>
        </Stack>
      </InputGroup>
    )
  }