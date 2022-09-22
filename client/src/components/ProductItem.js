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
  const { image, name, _id, price, quantity } = item;

  const [state, dispatch] = useStoreContext();

  const { cart } = state;

  const handleAddToCart = () => {
    // find the cart item with the matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);

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
    <SimpleGrid columns={[3, null, 4]} spacing="40px" minWidth="200px">
    {
      //  React.Children.toArray(
      state.products.map(
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
                key={"box1" + _id}
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
              >
                <chakra.h1
                  key={"h1a" + _id}
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
                  key={"badge" + _id}
                  borderRadius="full"
                  px="2"
                  backgroundColor="cream"
                  color="gray.800"
                >
                  {size} | {brand}
                </Badge>
                <Box key={"box2" + _id} px={4} py={2}>
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
                <Image
                  key={"image_" + _id}
                  h={52}
                  w="full"
                  fit="cover"
                  mt={2}
                  src={`images/${image}`}
                  // src={`images/${products.image}`}
                  alt={`Picture of ${image}`}
                />
                <Flex
                  key={"flex" + _id}
                  alignItems="center"
                  justifyContent="space-between"
                  px={4}
                  py={2}
                  bg="cream"
                  roundedBottom="lg"
                >
                  <chakra.h1
                    key={"h1b" + _id}
                    color="white"
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    {price}
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
            </>
          );
        }
      )
    }
  </SimpleGrid>

  );
}

export default ProductItem;

{/* <div className="card px-1 py-1">
<Link to={`/products/${_id}`}>
  <img alt={name} src={`/images/${image}`} />
  <p>{name}</p>
</Link>
<div>
  <div>
    {quantity} {pluralize("item", quantity)} in stock
  </div>
  <span>${price}</span>
</div>
<button onClick={addToCart}>Add to cart</button>
</div> */}
