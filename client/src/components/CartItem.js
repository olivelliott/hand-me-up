import { useEffect, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import OrderSummary from "./OrderSummary";

import {
  Box,
  List,
  Flex,
  Heading,
  Image,
  Select,
  ListItem,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  Button,
  Container,
} from "@chakra-ui/react";

const CartItem = ({ item }) => {
  const [state, dispatch] = useStoreContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    console.log("item deleted");
    idbPromise("cart", "delete", { ...item });

    // return handleUpdateSummary(item, state, dispatch);
  };

//   const onChange = (e) => {
//     const value = e.target.value;

//     if (value === "0") {
//       dispatch({
//         type: REMOVE_FROM_CART,
//         _id: item._id,
//       });

//       idbPromise("cart", "delete", { ...item });
//     } else {
//       dispatch({
//         type: UPDATE_CART_QUANTITY,
//         _id: item._id,
//         purchaseQuantity: parseInt(value),
//       });

//       idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
//     }
//   };

  return (
    <>
      <Box key={"purchase_" + item._id} className={"purchase_" + item._id}>
        <Flex>
          <Box
            mb="5"
            mr="5"
            minH="200px"
            maxH="200px"
            minW="200px"
            maxW="200px"
          >
            <Image
              boxSize="200px"
              objectFit="cover"
              src={`images/${item.image}`}
              alt="product"
            />
          </Box>
          <Box>
            <ListItem
              key={"brand_" + item._id}
              mr="5"
              maxH="20px"
              minW="200px"
              maxW="200px"
            >
              {item.brand}
            </ListItem>
            <ListItem
              key={"name_" + item._id}
              mb="2"
              mr="5"
              minH="30px"
              maxH="30px"
              minW="200px"
              maxW="200px"
            >
              <b>{item.name}</b>
            </ListItem>
            <ListItem
              key={"size_" + item._id}
              mb="5"
              mr="5"
              maxH="10px"
              minW="200px"
              maxW="200px"
            >
              {item.size}
            </ListItem>
            <ListItem
              key={"desc_" + item._id}
              mr="5"
              minH="175px"
              maxH="200px"
              minW="200px"
              maxW="200px"
            >
              {item.description}
            </ListItem>
          </Box>
          <Box minH="200px" maxH="200px" minW="125px" maxW="200px">
            <ListItem
              key={"price_" + item._id}
              mb="10"
              mr="5"
              maxH="10px"
              minW="200px"
              maxW="200px"
            >
              <b>${item.price}</b>
            </ListItem>
            <ListItem key={"select_" + item._id}>
              <Button
                key={"btn_rmv" + item._id}
                bg="red"
                color="white"
                size="sm"
                fontSize="sm"
                _hover={{ bg: "brick_red" }}
                onClick={() => removeFromCart(item)}
              >
                Remove
              </Button>
            </ListItem>
          </Box>
        </Flex>
      </Box>

    </>
  );
};

export default CartItem;
