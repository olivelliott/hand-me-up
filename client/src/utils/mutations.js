import { gql } from '@apollo/client';

// this must match what was set up on the server

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String! $lastName: String! $email: String! $password: String!) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

// users can upload their own products for sale
export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!,
    $brand: String,
    $size: String!,
    $description: String,
    $image: String,
    $quantity: Int,
    $price: Float,
    $category: String,
  )
  {
    addProduct(
      name: $name
      brand: $brand
      size: $size
      description: $description
      image: $image
      quantity: $quantity
      price: $price
      category: $category
    )
    {
      id
      name
      brand
      size
      description
      image
      quantity
      price
      category
      user {
        _id
      }
    }
  }
`;
