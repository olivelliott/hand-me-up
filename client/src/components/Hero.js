import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import image from '../assets/donation.png'

export default function Hero() {
  return (
    <Container maxW={'7xl'} pt={10} pb={10}>
      <Stack
        textAlign={'center'}
        spacing={{ base: 75, md: 100 }}
        py={{ base: 17, md: 22 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 7, md: 12 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '5xl' }}
          >
            <Text
              as={'span'}
              position={'relative'}
              fontFamily="header"
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'red.400',
                zIndex: -1,
              }}
            >
              CLEAN OUT YOUR CLOSET AND
            </Text>
            <br />
            <Text as={'span'} color={'red'} fontFamily="header">
              GIVE BACK
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Hand-Me-Up is a site where you can easily donate your unused clothes
            and have a chance to give back to the community! Every product
            purchased will cover the base shipping for you. Yes, you heard that
            right! We will send you a prepaid shipping label for you to send
            them out quickly and easily!
            <br />
            <br />
            Whoever decides to buy your used treasures will have a chance to
            donate to a charity or organization of THEIR choice! That way, we
            can all be supporting our community while also making use of
            second-hand products!
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'bold'}
              fontFamily='body'
              px={6}
              bg="red"
              color="white"
              _hover={{ bg: 'brick_red' }}
            >
              {' '}
              <Link to="/signup">Get Started!</Link>
            </Button>
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'bold'}
                            fontFamily='body'

              px={6}
              bg="red"
              color="white"
              _hover={{ bg: 'brick_red' }}
            >
              <Link to="./all-products">Products</Link>
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Box
            position={'relative'}
            height={'400px'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'400px'}
            overflow={'hidden'}
          >
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={image}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  )
}
