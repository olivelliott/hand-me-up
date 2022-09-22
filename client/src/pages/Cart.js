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
} from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_PRODUCTS } from '../utils/queries'

import { useLazyQuery } from '@apollo/client';

import CartItem from "../components/CartItem";

import Auth from "../utils/auth";
import { idbPromise } from "../utils/helpers";
import { useStoreContext } from "../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../utils/actions";
import { QUERY_CHECKOUT } from "../utils/queries";
import OrderSummary from "../components/OrderSummary";

// import { selectionSetMatchesResult } from "@apollo/client/cache/inmemory/helpers";

export default function Cart() {

  // const productArr = [
  //   {
  //     _id: '1',
  //     name: 'Sweater Set',
  //     brand: 'Free People',
  //     size: 'Medium',
  //     description:
  //       'Free People gently used sweater set. Perfect for lounging at home!',
  //     image: 'fp_sweater_set.jpeg',
  //     quantity: 1,
  //     price: 2.99,
  //     // category: categories[0]._id,
  //     // user: users[0],
  //   },
  //   {
  //     _id: '2',
  //     name: 'Linen Tank Top',
  //     brand: 'Old Navy',
  //     size: 'XX-Large',
  //     description: 'Used linen tank top. Has one small stain on the back!',
  //     image: 'linen_tank.jpeg',
  //     quantity: 1,
  //     price: 2.99,
  //     // category: categories[0]._id,
  //     // user: users[0],
  //   },
  //   {
  //     _id: '3',
  //     name: 'Black Long Sleeve',
  //     brand: 'J Crew',
  //     size: 'Small',
  //     description:
  //       'Simple black long sleeve top. Great for layering in the cold months!',
  //     image: 'navy_long_sleeve.jpeg',
  //     quantity: 1,
  //     price: 2.99,
  //     // category: categories[0]._id,
  //     // user: users[0],
  //   },
  //   {
  //     _id: '4',
  //     name: 'Printed Maxi Dress',
  //     brand: 'Anthropologie',
  //     size: 'Large',
  //     description:
  //       'In new condition without tags. Wore it once and its just not really my style.',
  //     image: 'maxi_dress.jpeg',
  //     quantity: 1,
  //     price: 2.99,
  //     // category: categories[0]._id,
  //     // user: users[1],
  //   },
  //   {
  //     _id: '5',
  //     name: 'Color Block Sneakers',
  //     brand: 'New Balance',
  //     size: 'Ten',
  //     description:
  //       'Super fun color block sneakers! In used condition but they have some miles to go!',
  //     image: 'color_block_sneakers.jpeg',
  //     quantity: 1,
  //     price: 2.99,
  //     // category: categories[0]._id,
  //     // user: users[2],
  //   },
  //   {
  //     _id: '6',
  //     name: 'Black Long Sleeve',
  //     brand: 'Tommy Hilfiger',
  //     size: 'Medium',
  //     description:
  //       'Button down collared linen shirt. Great for spring and summer and appropriate for work!',
  //     image: 'blue_button_shirt.jpeg',
  //     quantity: 1,
  //     price: 2.99,
  //     // category: categories[0]._id,
  //     // user: users[2],
  //   },
  // ]
  // const { data } = useQuery(QUERY_ALL_PRODUCTS)

  // const products = data?.products || productArr
  
  // const cart_items = products.filter(product => product._id in sessionStorage)
  //   const [cart, setCart] = useState(cart_items);

  // const initialLoad = () => {

  //   const data = products.filter(product => product._id in sessionStorage)
  //   // console.log(data)
  //   return data
  // }

  // useEffect(() => {initialLoad()}, [])

  // useEffect(() => {(async () => {
  //     const initial_data = await initialLoad;
  //     setCart(initial_data);
  //     return
  // })()
  // },[])

  // let initialCartCount = sessionStorage.length > 1 ? sessionStorage.length - 1 : 1
  // let initialSubTotal = initialCartCount * 2.99
  // let initialTax = initialSubTotal * .0475
  // let initialTotal = initialSubTotal + initialTax

  // const [itmCount, setCount] = useState([{itmId: 0, Count: cart_items.length, Price: 2.99 * cart_items.length}])
  // const [totalCount, setTotalCount] = useState(initialCartCount)
  // const [subTotal, setSubTotal] = useState(initialSubTotal)
  // const [shipAndTax, setTax] = useState(initialTax)
  // const [totalCost, setTotalCost] = useState(initialTotal)
  // console.log("INITIALCART: " +cart)


  // console.log("products: " + products)
  // console.log("cartItems: " + cart_items)

  // console.log(cart_items)



  // TODO: USE REDUCERS INSTEAD OF FOR LOOPS
  // TODO: GET THE TOTALS WORKING CORRECTLY (on form load and update)
  // TODO: Fix the page so it centers or put the summary on the bottom to get through the demo, talk w/ team about removing margin in app.js

  // useEffect(() => {setTotalItemCount()}, [itmCount])
  // useEffect(() => {set_Sub_Total()}, [totalCount])
  // useEffect(() => {set_Tax()}, [subTotal])
  // useEffect(() => {set_Total_Cost()}, [shipAndTax])

  // const cartHasItem = (itemId) => {
  //    cart.forEach(item => {
  //     // console.log(itemId + " : " + item._id)
  //       if (item._id === itemId)
  //         return true
  //    })
  //    return false;
  // }

  // let cartAry =  []

  // const updateCartArray = (el) => {
  //   cart_items.forEach(el => {
  //     console.log('>>updatecartArr', el)
  //     let item = {
  //       brand: el.brand,
  //       description: el.description,
  //       image: el.image,
  //       name: el.name,
  //       price: el.price,
  //       quantity: el.quantity,
  //       size: el.size,
  //       _id: el._id,
  //     }
  //     if(!cartHasItem(item._id))
  //       cartAry.push(item)
  //   });
  //   // console.log("cartarray:")
  //   // console.log(Object.values(cartAry))
  //   return cartAry
  // };

  // const rmvFromCart = (el) => {
  //   // console.log("cart_initial:")
  //   // console.log(el);
  //   // console.log(cart)

  //   // console.log(el);
  //   let cartArray = updateCartArray(el)

  //   cartArray = cartArray.filter((item) => item._id !== el._id)

  //   setCart(cartArray);

  //   // console.log("CART:")
  //   // console.log(cart)

  //   // let hardCopy = [...cart];
  //   // hardCopy = hardCopy.filter((cartItem) => cartItem._id !== el.id);
  //   // console.log("cart: " + hardCopy)

  //   // setCart(hardCopy);
  // };


  // const setTotalItemCount = () => {
  //   let total = 0;
  //   for(let i=0; i < itmCount.length; i++) {
  //     total += Number(itmCount[i].Count)
  //   }
  //   if(total > 0)
  //     setTotalCount(total)
  //   else
  //     setTotalCount(initialCartCount)
  // }

  // const set_Sub_Total = () => {
  //   let total = 0;
  //   for(let i=0; i < itmCount.length; i++) {
  //     total += Number(itmCount[i].Price)
  //   }
  //   if(total > 0)
  //     setSubTotal(total)
  //   else
  //     setSubTotal(initialSubTotal)
  // }

  // const set_Tax = () => {
  //   let total = 0
  //   total = total + (subTotal * .0475)
  //   if(total > 0)
  //     setTax(total.toFixed(2))
  //   else
  //     setTax(initialTax)
  // }

  // const set_Total_Cost = () => {
  //   let total = 0.0
  //   total = parseFloat(subTotal) + parseFloat(shipAndTax)
  //   if(total > 0)
  //     setTotalCost(total.toFixed(2))
  //   else
  //     setTotalCost(initialTotal)
  // }

  // const handleUpdateSummary = (e, id, count, price) => {
  //   e.preventDefault()
  //   console.log(id)
  //   if(itmCount && itmCount.find(x => x.itmId === id)) {
  //       const index = itmCount.map(e => e.itmId).indexOf(id)
  //       const newCount = [...itmCount]
  //       newCount[index].Count = count
  //       newCount[index].Price = price

  //       setCount(newCount)
  //   }
  //   else {

  //     const newCount = {
  //       itmId: id,
  //       Count: count,
  //       Price: price
  //     }

  //     const newCnt = [...itmCount, newCount ]

  //     setCount(newCnt);
  //   }
  // }

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

  // function calculateTotal() {
  //   let sum = 0;
  //   state.cart.forEach((item) => {
  //     sum += item.price * item.purchaseQuantity;
  //   });
  //   return sum.toFixed(2);
  // }


  // function submitCheckout() {
  //   const productIds = [];

  //   state.cart.forEach((item) => {
  //     for (let i = 0; i < item.purchaseQuantity; i++) {
  //       productIds.push(item._id);
  //     }
  //   });

  //   getCheckout({
  //       variables: { products: productIds }
  //   });
  // }

  // useEffect(() => {
  //   if (data) {
  //     stripePromise.then((res) => {
  //       res.redirectToCheckout({ sessionId: data.checkout.session });
  //     });
  //   }
  // }, [data]);

  // if (!state.cartOpen) {
  //   return (
  //     <div className="cart-closed" onClick={toggleCart}>
  //       <span role="img" aria-label="trash">
  //         🛒
  //       </span>
  //     </div>
  //   );
  // }

  return(
  <Container ml={0} fontFamily='body'>
  <Flex d='columns'>
  <Box align='left' key={'main-box'}
    maxW={{ base: '3xl', lg: '7xl' }}
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      align={{ lg: 'flex-start' }}
      spacing={{ base: '8', md: '16' }}
    >
      <Stack spacing={{ base: '8', md: '10' }} flex="2">
        <Heading key='main-heading' fontSize="2xl" fontWeight="extrabold">
          Shopping Cart
        </Heading>
          <List key='product-list'>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))
          }
          </List>
      </Stack>
    </Stack>

    <OrderSummary/>
</Box>
  </Flex>
  </Container>
  )
  }