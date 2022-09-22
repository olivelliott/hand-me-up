import { useEffect, useState } from "react";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

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

const OrderSummary = () => {
    const [state, dispatch] = useStoreContext();

    console.log(state.cart);

    let initialCartCount =
    state.cart.length > 1 ? state.cart.length : 1;
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


    return (
<Box mt="50px">
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
      <Input placeholder={totalCount} onChange={handleUpdateSummary} />
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
    >
      Checkout
    </Button>
  </Stack>
</Stack>
</Box>
    )
}

export default OrderSummary;