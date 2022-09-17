import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'

function AllProducts() {
  const productArr = [
    {
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

  return function ProductAddToCart() {
    return (
      <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
        >
          {Product.isNew && (
            <Circle
              size="10px"
              position="absolute"
              top={2}
              right={2}
              bg="red.200"
            />
          )}

          <Image
            src={Product.image}
            alt={`Picture of ${Product.name}`}
            roundedTop="lg"
          />

          <Box p="6">
            <Box d="flex" alignItems="baseline">
              {Product.isNew && (
                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                  New
                </Badge>
              )}
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {Product.name}
              </Box>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1.2em'}
              >
                <chakra.a href={'#'} display={'flex'}>
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                </chakra.a>
              </Tooltip>
            </Flex>

            <Flex justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                color={useColorModeValue('gray.800', 'white')}
              >
                <Box as="span" color={'gray.600'} fontSize="lg">
                  £
                </Box>
                {Product.price.toFixed(2)}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    )
  }
}

export default AllProducts
// export default ProductAddToCart

// image={product.image}
// name={product.name}
// size={product.size}
// description={product.description}
// brand={product.brand}
// price={product.price}
// category={product.category}
// quantity={product.quantity}
// user={product.user}
