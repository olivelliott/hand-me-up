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
  Container,
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_PRODUCTS } from '../utils/queries'
import CharityList from '../components/Charity'
// import { selectionSetMatchesResult } from "@apollo/client/cache/inmemory/helpers";

export default function Sandbox () {

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
  const { data } = useQuery(QUERY_ALL_PRODUCTS)

  const products = data?.products || productArr

  const cart_items = products.filter(product => product._id in sessionStorage)

  const [itmCount, setCount] = React.useState([])
  const [totalCount, setTotalCount] = React.useState(0)
  const [subTotal, setSubTotal] = React.useState(0)
  const [shipAndTax, setTax] = React.useState(0)
  const [totalCost, setTotalCost] = React.useState(0)

  // TODO: USE REDUCERS INSTEAD OF FOR LOOPS
  // TODO: GET THE TOTALS WORKING CORRECTLY (on form load and update)
  // TODO: Fix the page so it centers or put the summary on the bottom to get through the demo

  React.useEffect(() => {setTotalItemCount()}, [itmCount])
  React.useEffect(() => {set_Sub_Total()}, [totalCount])
  React.useEffect(() => {set_Tax()}, [subTotal])
  React.useEffect(() => {set_Total_Cost()}, [shipAndTax])

  const setTotalItemCount = () => {
    let total = 0;
    for(let i=0; i < itmCount.length; i++) {
      total += Number(itmCount[i].Count)
    }
    setTotalCount(total)
  }

  const set_Sub_Total = () => {
    let total = 0;
    for(let i=0; i < itmCount.length; i++) {
      total += Number(itmCount[i].Price)
    }
    setSubTotal(total)
  }

  const set_Tax = () => {
    let total = 0
    total = total + (subTotal * .0475)
    setTax(total.toFixed(2))
  }

  const set_Total_Cost = () => {
    let total = 0.0
    total = parseFloat(subTotal) + parseFloat(shipAndTax)
    setTotalCost(total.toFixed(2))
  }

  const handleUpdateSummary = (e, id, count, price) => {
    e.preventDefault()
    console.log(id)
    if(itmCount && itmCount.find(x => x.itmId === id)) {
        const index = itmCount.map(e => e.itmId).indexOf(id)
        const newCount = [...itmCount]
        newCount[index].Count = count
        newCount[index].Price = price

        setCount(newCount)
    }
    else {

      const newCount = {
        itmId: id,
        Count: count,
        Price: price
      }

      const newCnt = [...itmCount, newCount ]

      setCount(newCnt);
    }
  }

   return(
  <Container ml={0}>
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
              <Image boxSize='200px' objectFit='cover' src={`images/${item.image}`} alt="product" />
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
              <Select maxW='75px' border='2px' borderColor='black' aria-label="Select quantity"
               onChange={(e) => handleUpdateSummary(e, item._id, e.target.value, item.price)}
               className='add-item-input'>
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
<Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width='300px'>
      <Heading size="md">Order Summary</Heading>
      <CharityList />
      <Stack spacing="6">
      <InputGroup>
          <InputLeftAddon children="ItemCount" />
          <Input placeholder={totalCount} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Subtotal" />
          <Input placeholder={subTotal} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Shipping + Tax" />
          <Input placeholder={shipAndTax}/>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Total" />
          <Input placeholder={totalCost} />
        </InputGroup>
      <Button bg='red' color='white' size="lg" fontSize="md" _hover={{ bg: 'brick_red'}}>
        Checkout
      </Button>
    </Stack>
    </Stack>
</Box>
  </Flex>
  </Container>
  )
}