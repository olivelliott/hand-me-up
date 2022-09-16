import React from 'react'
import ProductCard from '../components/ProductCard'
// import { Grid } from '@chakra-ui/react'

export default function AllProducts() {
  return (
    <h1>Currently available:</h1>
      
        {map.products((product) => 
        <ProductItem
        
        image={product.image}
        name={product.name}
        size={product.size}
        description={product.description}
        brand={product.brand}
        price={product.price}
        category={product.category}
        quantity={product.quantity}
        user={product.user}

          />
          )}
      
  )
}
