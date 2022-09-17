import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'
import { gql } from '@apollo/client'

function AllProducts() {
  const productsArr = [{ name: 'Test Name', description: 'Test Description' }]

  {
    productsArr.map((product) => (
      <>
        <Flex p={50} w="full" alignItems="center" justifyContent="center">
          <Box
            // bg={useColorModeValue('white', 'gray.800')}
            maxW="sm"
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            position="relative"
          >
            <Image
              src={product.image}
              alt={`Picture of ${product.name}`}
              roundedTop="lg"
            />

            <Box p="6">
              <Box d="flex" alignItems="baseline"></Box>
              <Flex mt="1" justifyContent="space-between" alignContent="center">
                <Box
                  fontSize="2xl"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {product.name}
                </Box>
                <Tooltip
                  label="Add to cart"
                  bg="white"
                  placement={'top'}
                  color={'gray.800'}
                  fontSize={'1.2em'}
                >
                  <chakra.a href={'#'} display={'flex'}>
                    <Icon
                      as={FiShoppingCart}
                      h={7}
                      w={7}
                      alignSelf={'center'}
                    />
                  </chakra.a>
                </Tooltip>
              </Flex>

              <Flex justifyContent="space-between" alignContent="center">
                <Box
                  fontSize="2xl"
                  // color={useColorModeValue('gray.800', 'white')}
                >
                  <Box as="span" color={'gray.600'} fontSize="lg">
                    £
                  </Box>
                  {product.price.toFixed(2)}
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </>
    ))
  }
}

export default AllProducts

export const QUERY_PRODUCTS = gql`
  query products {
    product {
      name
      description
    }
  }
`
