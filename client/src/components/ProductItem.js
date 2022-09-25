import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../utils/helpers";
import { useStoreContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

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
    SimpleGrid
  } from "@chakra-ui/react";

function ProductItem(item) {
  const { _id,
    name,
    brand,
    size,
    description,
    image,
    quantity,
    price } = item;

  const [state, dispatch] = useStoreContext();

  const { cart } = state;

  const handleAddToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    console.log('>>item in cart', itemInCart);
    // if there was a match, call UPDATE with a new purchase quantity
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });

      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });

      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
              <Box
                key={"box1" + _id}
                maxW="xs"
                maxH="lg"
                mx="auto"
                bg="white"
                textAlign="center"
                _dark={{
                  bg: "gray.800",
                }}
                boxShadow='2xl'
                rounded="lg"
              >
                <chakra.h1
                  key={"h1a" + _id}
                  color="gray.800"
                  _dark={{
                    color: "white",
                  }}
                  fontWeight="extrabold"
                  fontSize={18}
                  textTransform="uppercase"
                  ml="2"
                  mr="2"
                  mt="2"
                  minH="50px"
                >
                  {name}
                </chakra.h1>
                <Badge
                  key={"badge" + _id}
                  borderRadius="full"
                  px="2"
                  backgroundColor="cream"
                  color="gray.800"
                  ml="2"
                  mt='2'
                >
                  {size} | {brand}
                </Badge>
                <Box key={"box2" + _id} minH='128px' px={4} py={2}>
                  <chakra.p
                    key={"p1" + _id}
                    mt={1}
                    fontSize="sm"
                    color="gray.600"
                    _dark={{
                      color: "gray.400",
                    }}
                  >
                    {description}
                  </chakra.p>
                </Box>
                <Box align='center'>
                <Image
                  key={"image_" + _id}
                  // h={52}
                  // w="full"
                  boxSize='250px'
                  mt={2}
                  objectFit='full'
                  src={`${image}`}
                  // src={`images/${products.image}`}
                  alt={`Picture of ${image}`}
                />
                </Box>
                <Flex
                  key={"flex" + _id}
                  alignItems="center"
                  justifyContent="space-between"
                  px={4}
                  py={2}
                  bg="darkest_teal"
                  roundedBottom="lg"
                >
                  <chakra.h1
                    key={"h1b" + _id}
                    color="white"
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    {`$ ${price}`}
                  </chakra.h1>
                  <chakra.button
                    id={_id}
                    key={"btn" + _id}
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
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </chakra.button>
                </Flex>
              </Box>

  );
}

export default ProductItem;

