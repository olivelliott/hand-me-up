import {
  Flex,
  Box,
  Grid,
  GridItem,
  Wrap,
  AspectRatio,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from '@chakra-ui/react'

import { FiShoppingCart } from 'react-icons/fi'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_PRODUCTS } from '../utils/queries'

function Allproducts() {
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

  const handleAddToCart = () => {
    console.log('handleAddToCart fired')
  }

  return (
    <div>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {products.map((product) => (
          <Flex p={50} w="full" alignItems="center" justifyContent="center">
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
        ))}
      </Grid>
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
