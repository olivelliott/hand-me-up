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
} from "@chakra-ui/react";

import { SimpleGrid } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS, QUERY_CATEGORIES } from "../utils/queries";
import { Link } from "react-router-dom";

function MensProducts() {
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);


  // function filterProducts() {
  //   if (!currentCategory) {
  //     return state.products;
  //   }

  //   return state.products.filter(
  //     (product) => product.category._id === currentCategory
  //   );
  // }
  const products = data?.products || [];


  // const productsByCategory = () => {
  //   const newproducts = products.filter(product => product.category._id === product.category[0]._id )
  //   console.log(newproducts);
  //   return newproducts;
  // }

  // console.log(productsByCategory);

  // console.log(products[0].category[0]._id)

  const handleAddToCart = async (e) => {
    e.preventDefault();
    console.log("handleAddToCart fired for " + e.target.id);
    sessionStorage.setItem(e.target.id, e.target.id);
  };

  // TODO: Conditionally render products based
  return (
    <>
      <Link to="/my-cart" pb={10}>
        <Button mb={5} bg="red" color='white' _hover={{ bg: "brick_red" }}>
          Go To Cart
        </Button>
      </Link>

      <SimpleGrid columns={[3, null, 4]} spacing="40px" minChildWidth="200px">
        {products.map(
          ({ name, brand, size, description, image, quantity, price }) => {
            return (
              <>
                <Box
                  maxW="xs"
                  maxH="lg"
                  mx="auto"
                  bg="white"
                  textAlign="center"
                  _dark={{
                    bg: "gray.800",
                  }}
                  shadow="lg"
                  rounded="lg"
                  key={name}
                >
                  <chakra.h1
                    color="gray.800"
                    _dark={{
                      color: "white",
                    }}
                    fontWeight="bold"
                    fontSize="3xl"
                    textTransform="uppercase"
                  >
                    {name}
                  </chakra.h1>
                  <Badge
                    borderRadius="full"
                    px="2"
                    backgroundColor="cream"
                    color="gray.800"
                  >
                    {size} | {brand}
                  </Badge>
                  <Box px={4} py={2}>
                    <chakra.p
                      mt={1}
                      fontSize="sm"
                      color="gray.600"
                      minH="75px"
                      _dark={{
                        color: "gray.400",
                      }}
                    >
                      {description}
                    </chakra.p>
                  </Box>
                  <Image
                    h={52}
                    w="full"
                    fit="cover"
                    mt={2}
                    src={`images/${image}`}
                    alt="NIKE AIR"
                  />

                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    px={4}
                    py={2}
                    bg="cream"
                    roundedBottom="lg"
                  >
                    <chakra.h1 fontWeight="bold" fontSize="lg">
                      {price}
                    </chakra.h1>
                    <chakra.button
                      px={2}
                      py={1}
                      bg="white"
                      fontSize="xs"
                      color="gray.900"
                      fontWeight="bold"
                      rounded="lg"
                      textTransform="uppercase"
                      _hover={{
                        bg: "gray.200",
                      }}
                      _focus={{
                        bg: "gray.400",
                      }}
                    >
                      Add to cart
                    </chakra.button>
                  </Flex>
                </Box>
              </>
            );
          }
        )}
      </SimpleGrid>
    </>
  );
}

export default MensProducts;
