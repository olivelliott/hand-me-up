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
} from '@chakra-ui/react'

import { SimpleGrid } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_PRODUCTS } from '../utils/queries'

function Allproducts() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS)
  const products = data?.products || []

  console.log(data)

  const handleAddToCart = () => {
    console.log('handleAddToCart fired')
  }

  // TODO Add conditional rendering so the page displays 'loading' until data loads from db
  return (
    <div>
      <SimpleGrid columns={{ sm: 2, md: 5 }} spacing="40px">
        {products.map((product) => (
          <Wrap>
            <Box
              bg="#94d2bd"
              maxW="sm"
              borderWidth="1px"
              rounded="lg"
              shadow="lg"
              position="relative"
            >
              {product.isNew && (
                <Circle
                  size="10px"
                  position="absolute"
                  top={2}
                  right={2}
                  bg="red.200"
                />
              )}

              <Image
                src={product.image}
                alt={`Picture of ${product.name}`}
                roundedTop="lg"
              />

              <Box p="6">
                <Box d="flex" alignItems="baseline">
                  {product.isNew && (
                    <Badge
                      rounded="full"
                      px="2"
                      fontSize="0.8em"
                      colorScheme="red"
                    >
                      New
                    </Badge>
                  )}
                </Box>
                <Flex
                  mt="1"
                  justifyContent="space-between"
                  alignContent="center"
                >
                  <Box
                    mr="5"
                    fontSize="2xl"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
                    {product.name}
                  </Box>
                  {/* TODO make this button add the item to cart in app state */}
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
                        onClick={handleAddToCart}
                      />
                    </chakra.a>
                  </Tooltip>
                </Flex>

                <Flex justifyContent="space-between" alignContent="center">
                  <Box
                    fontSize="2xl"
                  >
                    <Box as="span" color={'gray.600'} fontSize="lg">
                      £
                    </Box>
                    {product.price.toFixed(2)}
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Wrap>
        ))}
      </SimpleGrid>
    </div>
  )
}

export default Allproducts

// image={product.image}
// name={product.name}
// size={product.size}
// description={product.description}
// brand={product.brand}
// price={product.price}
// category={product.category}
// quantity={product.quantity}
// user={product.user}
