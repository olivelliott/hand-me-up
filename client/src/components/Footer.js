import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import footerlogo from '../assets/footer-logo-1.png'
import { useQuery } from '@apollo/client'
import { QUERY_CATEGORIES } from '../utils/queries'

export default function Footer() {
  // const { loading, data: category } = useQuery(QUERY_CATEGORIES);

  // const categories = category?.categories || [];

  // const womensCategory = categories[0]._id;
  // const mensCategory = categories[1]._id;

  // console.log(mensCategory);
  // console.log(womensCategory);

  // window.sessionStorage.setItem("mensCategory", mensCategory);
  // window.sessionStorage.setItem("womensCategory", womensCategory);

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Image src={footerlogo} maxW="10rem" />
        <Stack direction={'row'} spacing={6}>
          <Link to="/">Home</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
          <Link to="/all-products">Products</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text fontSize="sm" align="center">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </Text>
          <Stack direction={'row'} spacing={6}></Stack>
        </Container>
      </Box>
    </Box>
  )
}
