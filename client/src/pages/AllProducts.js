import { React, useState, useEffect } from 'react'
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
} from '@chakra-ui/react'

import ProductItem from '../components/ProductItem'

import { SimpleGrid } from '@chakra-ui/react'
import { FiShoppingCart } from 'react-icons/fi'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_PRODUCTS } from '../utils/queries'
import { UPDATE_PRODUCTS } from '../utils/actions'
import { Link, useParams } from 'react-router-dom'
import { idbPromise } from '../utils/helpers'

import { useStoreContext } from '../utils/GlobalState'
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions'

function Allproducts() {
  //   const { loading, data } = useQuery(QUERY_ALL_PRODUCTS)
  //   const products = data?.products || []

  //   const { name, description } = products

  //   const [state, dispatch] = useStoreContext();

  // const handleAddToCart = () => {
  //   dispatch({
  //     type: ADD_TO_CART,
  //     product: { ...name, purchaseQuantity: 1 }
  //   });
  //   console.log('Added to cart')
  // };

  // const [state, dispatch] = useStoreContext();
  // const { id } = useParams();

  // const [currentProduct, setCurrentProduct] = useState({});

  // const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  // const { products, cart } = state;

  // console.log(products);

  const [state, dispatch] = useStoreContext()

  const { currentCategory } = state

  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS)

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      })

      data.products.forEach((product) => {
        idbPromise('products', 'put', product)
      })
    } else if (!loading) {
      // since we're offline, get all of the data from the `products` store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        })
      })
    }
  }, [data, loading, dispatch])

  function filterProducts() {
    if (!currentCategory) {
      return state.products
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory,
    )
  }

  // TODO Add conditional rendering so the page displays 'loading' until data loads from db
  return (
    <>
      {/* <br></br>
      <Link to="/my-cart" pb={10}>
        <Button mb={5} bg="red" color="white" _hover={{ bg: 'brick_red' }}>
          Go To Cart
        </Button>
      </Link> */}

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
    </>
  )
}

export default Allproducts
