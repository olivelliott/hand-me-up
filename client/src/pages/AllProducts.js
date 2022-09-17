import React from 'react'
import { Box, Badge, Image, Flex, Link, chakra } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'

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

  return (
    <Flex
      bg="navy"
      _dark={{
        bg: '#3e3e3e',
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      <Helmet>
        <title>Product</title>
      </Helmet>

      {productArr.map(
        ({
          name,
          brand,
          size,
          description,
          image,
          quantity,
          price,
          category,
          user,
        }) => {
          return (
            <Box
              m={5}
              bg="gray.800"
              _dark={{
                bg: 'gray.800',
              }}
              mx={{
                lg: 8,
              }}
              display={{
                lg: 'flex',
              }}
              maxW={{
                lg: '5xl',
              }}
              shadow={{
                lg: 'lg',
              }}
              rounded={{
                lg: 'lg',
              }}
            >
              <Box w={{ lg: '50%' }}>
                <Image
                  h={{ base: 64, lg: 'full', md: 'full', sm: 'full' }}
                  rounded={{
                    lg: 'lg',
                  }}
                  bgSize="cover"
                  // src={imagePath}
                ></Image>
              </Box>

              <Box
                py={12}
                px={6}
                maxW={{
                  base: 'xl',
                  lg: '5xl',
                }}
                w={{
                  lg: '50%',
                }}
              >
                <chakra.h2
                  fontSize={{
                    base: '2xl',
                    md: '3xl',
                  }}
                  color="white"
                  _dark={{
                    color: 'white',
                  }}
                  fontWeight="bold"
                >
                  {name}
                </chakra.h2>
                <Badge
                  borderRadius="full"
                  px="2"
                  backgroundColor="orange"
                  color="gray.800"
                ></Badge>
                <chakra.p
                  mt={4}
                  color="white"
                  _dark={{
                    color: 'gray.400',
                  }}
                >
                  {description}
                </chakra.p>

                <Box mt={8}></Box>

                <Box mt={8}></Box>
              </Box>
            </Box>
          )
        },
      )}
    </Flex>
  )
}

export default AllProducts

// image={product.image}
// name={product.name}
// size={product.size}
// description={product.description}
// brand={product.brand}
// price={product.price}
// category={product.category}
// quantity={product.quantity}
// user={product.user}
