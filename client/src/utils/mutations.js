import { gql } from '@apollo/client';

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
// ! I THINK quantity and price are int and float, not number
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
    $user: User._id
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
      user: $user._id
    )
  }
`;
