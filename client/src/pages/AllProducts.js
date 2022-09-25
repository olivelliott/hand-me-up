import { React, useState, useEffect } from "react";
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

import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CategoryMenu from '../components/CategoryMenu'
import ProductItem from "../components/ProductItem";

import spinner from "../assets/spinner.gif";

import { FiShoppingCart } from "react-icons/fi";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { idbPromise } from "../utils/helpers";
import { useStoreContext } from "../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";

function Allproducts() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  // const womensCategory = state.products[0].category[0]._id
  // console.log(womensCategory);
  // const mensCategory = state.products[6].category[0]._id
  // console.log(mensCategory);

  // console.log({currentCategory})

  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      // since we're offline, get all of the data from the `products` store
      idbPromise("products", "get").then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category[0]._id === currentCategory
    );
  }
  return (
    <>
      <CategoryMenu/>

      <Link to="/my-cart">
        <Button ml={5} mt={10} bg="red" color="white" _hover={{ bg: 'brick_red' }}>
          Go To Cart
        </Button>
      </Link>

      {state.products.length ? (
      <SimpleGrid
      columns={[3, null, 4]}
      mt="20"
      ml="20"
      mr="20"
      mb="20"
      spacing="40px"
      minChildWidth="275px"
    >
      {filterProducts().map((product) => (
        <ProductItem
          key={product._id}
          _id={product._id}
          image={product.image}
          name={product.name}
          size={product.size}
          brand={product.brand}
          description={product.description}
          price={product.price}
          quantity={product.quantity}
        />
      ))}
    </SimpleGrid>

      ) : (
        <h1>no products yet</h1>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Allproducts;
