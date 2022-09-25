import React, { useState, useEffect } from "react";

import {
  Box,
  List,
  Flex,
  Heading,
  Select,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  Button,
  Container,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";

import { useLazyQuery } from "@apollo/client";

import CartItem from "../components/CartItem";

import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_MULTIPLE_TO_CART,
} from "../utils/actions";

import Auth from "../utils/auth";
import { idbPromise } from "../utils/helpers";
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_CHECKOUT } from "../utils/queries";
import OrderSummary from "../components/OrderSummary";

export default function Cart() {
  const [state, dispatch] = useStoreContext();
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  useEffect(() => {
    calculateTotal();
  }, [state.cartTotal])

  let initialCartCount = state.cart.length > 1 ? state.cart.length : 0;
  let initialSubTotal = initialCartCount * 2.99;
  let initialTax = initialSubTotal * 0.0475;
  let initialTotal = initialSubTotal + initialTax;

  const [itmCount, setCount] = useState([
    { itmId: 0, Count: state.cart.length, Price: 2.99 * state.length },
  ]);
  const [totalCost, setTotalCost] = useState(initialTotal);

  const totalItemCount = state.cart.length;

  // console.log(state.cartTotal)

  const calculateSubTotal = () => {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  };

  const calculateTax = () => {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * 0.0475;
    });
    return sum.toFixed(2);
  };

  const calculateTotal = (number) => {
    if (number) {
      let sum = number;
      console.log(sum);

      state.cart.forEach((item) => {
        sum += item.price * calculateTax() + item.price * item.purchaseQuantity;
      });
      console.log(state.cartTotal);
      // setTotalCost(state.cartTotal)
      // console.log(totalCost);
      return (state.cartTotal = sum.toFixed(2));
    }

    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * calculateTax() + item.price * item.purchaseQuantity;
    });

    console.log(state.cartTotal);
    return (state.cartTotal = sum.toFixed(2));
  };

  // const handleUpdateSummary = (id, count, price) => {
  //   console.log(id);
  //   console.log("here");
  //   if (itmCount && itmCount.find((x) => x.itmId === id)) {
  //     const index = itmCount.map((e) => e.itmId).indexOf(id);
  //     const newCount = [...itmCount];
  //     newCount[index].Count = count;
  //     newCount[index].Price = price;

  //     setCount(newCount);
  //   } else {
  //     const newCount = {
  //       itmId: id,
  //       Count: count,
  //       Price: price,
  //     };

  //     const newCnt = [...itmCount, newCount];

  //     setCount(newCnt);
  //   }
  // };

  const handleShowAmtButtons = (e) => {
    const val = e.target.value;
    // console.log('charityVal= ' + val)
    if (!val || val === "0") setShow(false);
    if (val && parseInt(val) > 0) setShow(true);
  };

  const updateSummaryWithDonation = (amount) => {
    const newTotal = (parseFloat(state.cartTotal) + amount).toFixed(2);
    // setTotalCost(newTotal);
    // console.log(newTotal);
    const updatedTotal = (state.cartTotal = newTotal);
    // console.log(updatedTotal);
    console.log(this.state.cartTotal);
    calculateTotal(updatedTotal);
    // console.log(state.cartTotal + amount);
  };

  console.log(state.cartTotal);

  return (
    <Container ml={0}>
      <Flex d="columns">
        <Box
          align="left"
          key={"main-box"}
          maxW={{ base: "3xl", lg: "7xl" }}
          mx="auto"
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
            spacing={{ base: "8", md: "16" }}
          >
            <Stack spacing={{ base: "8", md: "10" }} flex="2">
              <Heading key="main-heading" fontSize="2xl" fontWeight="extrabold">
                Shopping Cart
              </Heading>
              <List key="product-list">
                {state.cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </List>
            </Stack>
          </Stack>
        </Box>
        <Box mt="100px" mb={8}>
          <Stack
            spacing="8"
            borderWidth="1px"
            rounded="lg"
            padding="8"
            width="300px"
          >
            <Heading size="md">Order Summary</Heading>
            <Stack spacing="6">
              <InputGroup>
                <InputLeftAddon children="ItemCount" />
              </InputGroup>
              <Text>{totalItemCount}</Text>
              <InputGroup>
                <InputLeftAddon children="Subtotal" />
                <Input />
                <Text>${calculateSubTotal()}</Text>
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Shipping + Tax" />
                <Input />
                <Text>${calculateTax()}</Text>
              </InputGroup>
              <Box>
                <Text>${calculateTotal()}</Text>
                <Text>${state.cartTotal}</Text>
              </Box>
              <Box borderWidth={1} pt="2" pl="2" pr="2">
                <Heading fontSize="1xl">Add a donation?</Heading>
                <Select
                  maxW="300px"
                  maxH="40px"
                  mt="2"
                  mb="2"
                  defaultValue="0"
                  onChange={(e) => handleShowAmtButtons(e)}
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
                    style={{ visibility: show ? "visible" : "hidden" }}
                    onClick={() => updateSummaryWithDonation(5)}
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
                    style={{ visibility: show ? "visible" : "hidden" }}
                    onClick={() => updateSummaryWithDonation(10)}
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
                    style={{ visibility: show ? "visible" : "hidden" }}
                    onClick={() => updateSummaryWithDonation(15)}
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
                    style={{ visibility: show ? "visible" : "hidden" }}
                    onClick={() => updateSummaryWithDonation(20)}
                  >
                    $20
                  </Button>
                </Flex>
              </Box>
              <Button
                bg="red"
                color="white"
                size="lg"
                fontSize="md"
                _hover={{ bg: "brick_red" }}
                fontFamily="body"
              >
                Checkout
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}
