import React from "react";
import { Box, Heading, Select, Flex, Button } from "@chakra-ui/react";

import { useStoreContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";


const DonationItem = (value) => {

  const [state, dispatch] = useStoreContext();

  const { cart } = state;

  const handleAddToCart = () => {
    // find the cart item with the matching id
    // const itemInCart = cart.find((cartItem) => cartItem._id === _id);

    // console.log('>>item in cart', itemInCart);
    // if there was a match, call UPDATE with a new purchase quantity
    // if (itemInCart) {
    //   dispatch({
    //     type: UPDATE_CART_QUANTITY,
    //     _id: _id,
    //     purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
    //   });

    //   idbPromise("cart", "put", {
    //     ...itemInCart,
    //     purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
    //   });
    // } else {
    //   dispatch({
    //     type: ADD_TO_CART,
    //     product: { ...item, purchaseQuantity: 1 },
    //   });

    //   idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    // }
  };

  const handleClick = (e) => {
    console.log('click');
    console.log(e.target.value);

  }

  return (
    <Box borderWidth={1} pt="2" pl="2" pr="2">
      <Heading fontSize="1xl">Add a donation?</Heading>
      <Select
        maxW="300px"
        maxH="40px"
        mt="2"
        mb="2"
        defaultValue="0"
        className="add-item-input"
      >
        <option value="0">Select a charity</option>
        <option value="1">OBX Hotline</option>
        <option value="2">Planned Parenthood</option>
        <option value="3">American Humane</option>
        <option value="4">NAACP</option>
      </Select>
      <Flex>
        <Button
          key="bntDonate5"
          mt="10px"
          mr="2"
          ml="1"
          bg="red"
          color="white"
          size="sm"
          fontSize="sm"
          _hover={{ bg: "brick_red" }}
          value='5'
          onClick={() => handleClick()}
        >
          $5
        </Button>
        <Button
          key="bntDonate10"
          mt="10px"
          mr="2"
          bg="red"
          color="white"
          size="sm"
          fontSize="sm"
          _hover={{ bg: "brick_red" }}
          value='10'
        >
          $10
        </Button>
        <Button
          key="bntDonate15"
          mt="10px"
          mr="2"
          bg="red"
          color="white"
          size="sm"
          fontSize="sm"
          _hover={{ bg: "brick_red" }}
          value='15'
        >
          $15
        </Button>
        <Button
          key="bntDonate20"
          mt="10px"
          bg="red"
          color="white"
          size="sm"
          fontSize="sm"
          _hover={{ bg: "brick_red" }}
          value='20'
        >
          $20
        </Button>
      </Flex>
    </Box>
  );
};

export default DonationItem;
