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
  Button
} from '@chakra-ui/react'

import { SimpleGrid } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_PRODUCTS } from '../utils/queries'

function AllProducts() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS)
  const products = data?.products || []

  const handleAddToCart = async (e) => {
    e.preventDefault()
    console.log('handleAddToCart fired for ' + e.target.id)
    sessionStorage.setItem(e.target.id, e.target.id);
  }

// TODO Add conditional rendering so the page displays 'loading' until data loads from db
return (
  <div key={'mainDiv'}>
    {/* ADD CART LINK TO HEADER */}
    <a href="./my-cart">*** GO TO CART LINK ***</a>
    <SimpleGrid columns={{ sm: 2, md: 5 }} spacing="40px" minChildWidth='200px'>
      {products.map((product) => (
        <Wrap key={'wrap_'+product._id}>
          <Box key={'newProduct_'+product._id}
            bg="#94d2bd"
            minW='200px'
            maxW="200px"
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            position="relative"
            minH='150px'
            maxH='150px'
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

            <Image key={'img_'+product._id}
              src={`images/${product.image}`}
              // src='/images/blue_button_shirt.jpeg'
              alt={`Picture of ${product.name}`}
              roundedTop="lg"
            />

            <Box key={'badgeBox_'+product._id} p="6">
              <Box key={'box_'+product._id} d="flex" alignItems="baseline">
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
                <Box key={'name_'+product._id}
                  mr="5"
                  fontSize="2xl"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
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
                      // onClick={handleAddToCart}
                    />
                  </chakra.a>
                </Tooltip>
              </Flex>

              <Flex justifyContent="space-between" alignContent="center">
                <Box key={'price_'+product._id}
                  fontSize="2xl"
                >
                  <Box key={'span_'+product._id} as="span" color={'gray.600'} fontSize="lg">
                    £
                  </Box>
                  {product.price.toFixed(2)}
                </Box>
              </Flex>
            </Box>
          </Box>
          <Button
              mb={5}
              colorScheme='gray'
              variant='outline'
              style={{ color: 'red' }}
              id={product._id}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
        </Wrap>
      ))}
    </SimpleGrid>
  </div>
)
}

export default AllProducts;

// image={product.image}
// name={product.name}
// size={product.size}
// description={product.description}
// brand={product.brand}
// price={product.price}
// category={product.category}
// quantity={product.quantity}
// user={product.user}
