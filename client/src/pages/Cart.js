import React, { useState, useEffect } from "react";

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

// import { selectionSetMatchesResult } from "@apollo/client/cache/inmemory/helpers";

export default function Cart() {

  // TODO: USE REDUCERS INSTEAD OF FOR LOOPS
  // TODO: GET THE TOTALS WORKING CORRECTLY (on form load and update)
  // TODO: Fix the page so it centers or put the summary on the bottom to get through the demo, talk w/ team about removing margin in app.js

  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  console.log(state.cart);

  let initialCartCount = state.cart.length > 1 ? state.cart.length : 1;
  let initialSubTotal = initialCartCount * 2.99;
  let initialTax = initialSubTotal * 0.0475;
  let initialTotal = initialSubTotal + initialTax;

  const [itmCount, setCount] = useState([
    { itmId: 0, Count: state.cart.length, Price: 2.99 * state.length },
  ]);
  const [totalCount, setTotalCount] = useState(initialCartCount);
  const [subTotal, setSubTotal] = useState(initialSubTotal);
  const [shipAndTax, setTax] = useState(initialTax);
  const [totalCost, setTotalCost] = useState(initialTotal);

  useEffect(() => {
    setTotalItemCount();
  }, [itmCount]);
  useEffect(() => {
    set_Sub_Total();
  }, [totalCount]);
  useEffect(() => {
    set_Tax();
  }, [subTotal]);
  useEffect(() => {
    set_Total_Cost();
  }, [shipAndTax]);

  const setTotalItemCount = () => {
    let total = 0;
    for (let i = 0; i < itmCount.length; i++) {
      total += Number(itmCount[i].Count);
    }
    if (total > 0) setTotalCount(total);
    else setTotalCount(initialCartCount);
  };

  const set_Sub_Total = () => {
    let total = 0;
    for (let i = 0; i < itmCount.length; i++) {
      total += Number(itmCount[i].Price);
    }
    if (total > 0) setSubTotal(total);
    else setSubTotal(initialSubTotal);
  };

  const set_Tax = () => {
    let total = 0;
    total = total + subTotal * 0.0475;
    if (total > 0) setTax(total.toFixed(2));
    else setTax(initialTax);
  };

  const set_Total_Cost = () => {
    let total = 0.0;
    total = parseFloat(subTotal) + parseFloat(shipAndTax);
    if (total > 0) setTotalCost(total.toFixed(2));
    else setTotalCost(initialTotal);
  };

  const handleUpdateSummary = (id, count, price) => {
    console.log(id)
    console.log('here')
    if(itmCount && itmCount.find(x => x.itmId === id)) {
        const index = itmCount.map(e => e.itmId).indexOf(id)
        console.log('here')
        const newCount = [...itmCount]
        newCount[index].Count = count
        newCount[index].Price = price

        setCount(newCount)
    }
    else {

      const newCount = {
        itmId: id,
        Count: count,
        Price: price
      }

      const newCnt = [...itmCount, newCount ]

      setCount(newCnt);
    }
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  // const onChange = (e) => {
  //   const value = e.target.value;

  //   if (value === "0") {
  //     dispatch({
  //       type: REMOVE_FROM_CART,
  //       _id: item._id,
  //     });

  //     idbPromise("cart", "delete", { ...item });
  //   } else {
  //     dispatch({
  //       type: UPDATE_CART_QUANTITY,
  //       _id: item._id,
  //       purchaseQuantity: parseInt(value),
  //     });

  //     idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
  //   }
  // };

  return (
    <Container ml={0} fontFamily="body">
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
              <Heading
                key="main-heading"
                fontSize="2xl"
                fontWeight="extrabold"
                fontFamily="body"
              >
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
        <Box mt="50px" mb={8}>
          <Stack
            spacing="8"
            borderWidth="1px"
            rounded="lg"
            padding="8"
            width="300px"
          >
            <Heading size="md" fontFamily="body">
              Order Summary
            </Heading>
            <Stack spacing="6">
              <InputGroup>
                <InputLeftAddon children="ItemCount" />
                <Input
                  value={totalCost}
                  placeholder={totalCost}
                  onChange={handleUpdateSummary}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Subtotal" />
                <Input placeholder={subTotal} />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Shipping + Tax" />
                <Input placeholder={shipAndTax} />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Total" />
                <Input placeholder={totalCost} value={totalCost} />
              </InputGroup>
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
