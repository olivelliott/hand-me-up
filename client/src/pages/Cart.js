import React from "react";
import { useQuery } from '@apollo/client'
import { QUERY_SINGLE_PRODUCT } from '../utils/queries'

export default function Cart () {

  const productArr = [
    {
      _id: '1',
      name: 'Sweater Set',
      brand: 'Free People',
      size: 'Medium',
      description:
        'Free People gently used sweater set. Perfect for lounging at home!',
      image: 'fp_sweater_set.jpeg',
      quantity: 1,
      price: 2.99,
      // category: categories[0]._id,
      // user: users[0],
    },
    {
      _id: '2',
      name: 'Linen Tank Top',
      brand: 'Old Navy',
      size: 'XX-Large',
      description: 'Used linen tank top. Has one small stain on the back!',
      image: 'linen_tank.jpeg',
      quantity: 1,
      price: 2.99,
      // category: categories[0]._id,
      // user: users[0],
    },
    {
      _id: '3',
      name: 'Black Long Sleeve',
      brand: 'J Crew',
      size: 'Small',
      description:
        'Simple black long sleeve top. Great for layering in the cold months!',
      image: 'navy_long_sleeve.jpeg',
      quantity: 1,
      price: 2.99,
      // category: categories[0]._id,
      // user: users[0],
    },
    {
      _id: '4',
      name: 'Printed Maxi Dress',
      brand: 'Anthropologie',
      size: 'Large',
      description:
        'In new condition without tags. Wore it once and its just not really my style.',
      image: 'maxi_dress.jpeg',
      quantity: 1,
      price: 2.99,
      // category: categories[0]._id,
      // user: users[1],
    },
    {
      _id: '5',
      name: 'Color Block Sneakers',
      brand: 'New Balance',
      size: 'Ten',
      description:
        'Super fun color block sneakers! In used condition but they have some miles to go!',
      image: 'color_block_sneakers.jpeg',
      quantity: 1,
      price: 2.99,
      // category: categories[0]._id,
      // user: users[2],
    },
    {
      _id: '6',
      name: 'Black Long Sleeve',
      brand: 'Tommy Hilfiger',
      size: 'Medium',
      description:
        'Button down collared linen shirt. Great for spring and summer and appropriate for work!',
      image: 'blue_button_shirt.jpeg',
      quantity: 1,
      price: 2.99,
      // category: categories[0]._id,
      // user: users[2],
    },
  ]

  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT)
  const products = data?.products || productArr
  const cart_items = products.filter(product => product._id in sessionStorage)

  return (
    <div className='content'>
      NEED A "CONTINUE SHOPPING" LINK
      <ul className='products'>
        {
          cart_items.map(product =>
          <li key={product._id} className='product-li'>
            <div className='product'>
              {/* <img className='product-image' src={product.image} alt="product" /> */}
              <div className='product-name'>{product.name}</div>
              <div className='product-brand'>{product.brand}</div>
              <div className='product-price'>${product.price}</div>
            </div>
          </li>
          )
        }
      </ul>
      </div>
  )
}