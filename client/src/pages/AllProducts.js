import React from 'react'
import {
  Flex,
  Badge,
  Box,
  Circle,
  Wrap,
  Image,
  Icon,
  chakra,
  Tooltip,
  list,
  Button,
} from '@chakra-ui/react'

import { SimpleGrid } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_PRODUCTS } from '../utils/queries'
import { Link } from 'react-router-dom'

function Allproducts() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS)
  const products = data?.products || []

  const handleAddToCart = async (e) => {
    e.preventDefault()
    console.log('handleAddToCart fired for ' + e.target.id)
    sessionStorage.setItem(e.target.id, e.target.id)
    sessionStorage.setItem("cartCount", (sessionStorage.length - 1).toString())    
  }

  // TODO Add conditional rendering so the page displays 'loading' until data loads from db
  return (
    <>
      <SimpleGrid
        columns={[3, null, 4]}
        mt="20"
        ml="20"
        mr="20"
        mb="20"
        spacing="40px"
        minChildWidth="275px"
      >
        {React.Children.toArray(
          products.map(
            ({
              _id,
              name,
              brand,
              size,
              description,
              image,
              quantity,
              price,
            }) => {
              return (
                <>
                  <Box
                    key={'box1' + _id}
                    maxW="xs"
                    maxH="lg"
                    mx="auto"
                    bg="white"
                    _dark={{
                      bg: 'gray.800',
                    }}
                    shadow="lg"
                    rounded="lg"
                  >
                    <chakra.h1
                      key={'h1a' + _id}
                      color="gray.800"
                      _dark={{
                        color: 'white',
                      }}
                      fontWeight="bold"
                      fontSize="3xl"
                      textTransform="uppercase"
                      ml="2"
                      mr="2"
                      mt="2"
                    >
                      {name}
                    </chakra.h1>
                    <Badge
                      key={'badge' + _id}
                      borderRadius="full"
                      px="2"
                      backgroundColor="cream"
                      color="gray.800"
                      ml="2"
                    >
                      {size} | {brand}
                    </Badge>
                    <Box key={'box2' + _id} px={4} py={2}>
                      <chakra.p
                        key={'p1' + _id}
                        mt={1}
                        fontSize="sm"
                        color="gray.600"
                        _dark={{
                          color: 'gray.400',
                        }}
                      >
                        {description}
                      </chakra.p>
                    </Box>
                    <Image
                      key={'image_' + _id}
                      h={52}
                      w="full"
                      fit="cover"
                      mt={2}
                      src={`${image}`}
                      alt={`Picture of ${image}`}
                    />
                    <Flex
                      key={'flex' + _id}
                      alignItems="center"
                      justifyContent="space-between"
                      px={4}
                      py={2}
                      bg="darkest_teal"
                      roundedBottom="lg"
                    >
                      <chakra.h1
                        key={'h1b' + _id}
                        color="white"
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        ${price.toFixed(2)}
                      </chakra.h1>
                      <chakra.button
                        id={_id}
                        key={'btn' + _id}
                        px={2}
                        py={1}
                        bg="white"
                        fontSize="xs"
                        color="gray.900"
                        fontWeight="bold"
                        rounded="lg"
                        textTransform="uppercase"
                        _hover={{
                          bg: 'gray.200',
                        }}
                        _focus={{
                          bg: 'gray.400',
                        }}
                        onClick={handleAddToCart}
                      >
                        Add to cart
                      </chakra.button>
                    </Flex>
                  </Box>
                </>
              )
            },
          ),
        )}
      </SimpleGrid>
    </>
  )
}

export default Allproducts
