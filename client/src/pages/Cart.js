import React from "react";
import {
  Box,
  List,
  Flex,
  Heading,
  Image,
  Select,
  ListItem,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  Button,
  useColorModeValue as mode,
  Container,
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_PRODUCTS } from '../utils/queries'

// TODO IF TIME GET SINGLE QUERY WORKING SO WE DON'T PULL ALL DATA TO GET CART UPDATED
// TODO IF TIME RE WORK TO USE COOKIES INSTEAD OF SESSION STORAGE
// TODO USE STATE TO MANAGE QUANTITIES AND NUMBER ORDERED

export default function Cart () {

  const productArr = [
    {
      _id: '1',
      name: 'Sweater Set',
      brand: 'Free People',
      size: 'Medium',
      description:
        'Free People gently used sweater set. Perfect for lounging at home!',
      image: 'fp_sweater_set.jpeg',
      quantity: 1,
      price: 2.99,
      // category: categories[0]._id,
      // user: users[0],
    },
    {
      _id: '2',
      name: 'Linen Tank Top',
      brand: 'Old Navy',
      size: 'XX-Large',
      description: 'Used linen tank top. Has one small stain on the back!',
      image: 'linen_tank.jpeg',
      quantity: 1,
      price: 2.99,
      // category: categories[0]._id,
      // user: users[0],
    },
    {
      _id: '3',
      name: 'Black Long Sleeve',
      brand: 'J Crew',
      size: 'Small',
      description:
        'Simple black long sleeve top. Great for layering in the cold months!',
      image: 'navy_long_sleeve.jpeg',
      quantity: 1,
      price: 2.99,
      // category: categories[0]._id,
      // user: users[0],
    },
    {
      _id: '4',
      name: 'Printed Maxi Dress',
      brand: 'Anthropologie',
      size: 'Large',
      description:
        'In new condition without tags. Wore it once and its just not really my style.',
      image: 'maxi_dress.jpeg',
      quantity: 1,
      price: 2.99,
      // category: categories[0]._id,
      // user: users[1],
    },
    {
      _id: '5',
      name: 'Color Block Sneakers',
      brand: 'New Balance',
      size: 'Ten',
      description:
        'Super fun color block sneakers! In used condition but they have some miles to go!',
      image: 'color_block_sneakers.jpeg',
      quantity: 1,
      price: 2.99,
      // category: categories[0]._id,
      // user: users[2],
    },
    {
      _id: '6',
      name: 'Black Long Sleeve',
      brand: 'Tommy Hilfiger',
      size: 'Medium',
      description:
        'Button down collared linen shirt. Great for spring and summer and appropriate for work!',
      image: 'blue_button_shirt.jpeg',
      quantity: 1,
      price: 2.99,
      // category: categories[0]._id,
      // user: users[2],
    },
  ]

  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS)

  const products = data?.products || productArr
  const cart_items = products.filter(product => product._id in sessionStorage)

   return(
  <Container>
  <Flex d='columns'>
  <Box align='left' key={'main-box'}
    // TODO ADD A "CONTINUE SHOPPING" LINK
    maxW={{ base: '3xl', lg: '7xl' }}
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      align={{ lg: 'flex-start' }}
      spacing={{ base: '8', md: '16' }}
    >
      <Stack spacing={{ base: '8', md: '10' }} flex="2">
        <Heading key='main-heading' fontSize="2xl" fontWeight="extrabold">
          Shopping Cart
        </Heading>

          <List key='product-list'>
          {cart_items.map((item) => (
          <Box key={'purchases_'+item._id}>
          <Flex>
            <Box mb='5' mr='5' minH='200px' maxH='200px' minW='200px' maxW='200px'>
              <Image boxSize='200px' objectFit='cover' src="https://via.placeholder.com/200" alt="product" />
            </Box>
            <Box>
              <ListItem key={'brand_'+item._id} mr='5' maxH='20px' minW='200px' maxW='200px'>{item.brand}</ListItem>
              <ListItem key={'name_'+item._id} mb='2' mr='5' minH='30px' maxH='30px' minW='200px' maxW='200px'><b>{item.name}</b></ListItem>
              <ListItem key={'size_'+item._id} mb='5' mr='5' maxH='10px' minW='200px' maxW='200px'>{item.size}</ListItem>
              <ListItem key={'desc_'+item._id} mr='5' minH='175px' maxH='200px' minW='200px' maxW='200px'>{item.description}</ListItem>

              </Box>
              <Box  minH='200px' maxH='200px' minW='125px' maxW='200px'>
              <ListItem key={'price_'+item._id} mb='10' mr='5' maxH='10px' minW='200px' maxW='200px'><b>${item.price}</b></ListItem>
              <ListItem key={'select_'+item._id}>
              <Select maxW='75px' border='2px' borderColor='black' aria-label="Select quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Select>
              </ListItem>
              </Box>
          </Flex>
          </Box>
          ))
          }
          </List>
      </Stack>
    </Stack>
</Box>
<Box mt='50px'>
<Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <InputGroup>
          <InputLeftAddon children="Subtotal" />
          <Input placeholder="15" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Shipping + Tax" />
          <Input placeholder="10" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Total" />
          <Input placeholder="25" />
        </InputGroup>
      <Button colorScheme="blue" size="lg" fontSize="md">
        Checkout
      </Button>
    </Stack>
    </Stack>
</Box>
  </Flex>
  </Container>
  )
  }

 