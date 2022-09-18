import { gql } from "@apollo/client";

// this must match what was set up on the server

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        firstName
        lastName
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
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
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
mutation Mutation($name: String!, $size: String!, $brand: String, $description: String, $image: String, $quantity: Int, $price: Float, $user: [ID]) {
  addProduct(name: $name, size: $size, brand: $brand, description: $description, image: $image, quantity: $quantity, price: $price, user: $user) {
    _id
    name
    brand
    size
    description
    image
    quantity
    price
    user {
      _id
    }
  }
}}`;

