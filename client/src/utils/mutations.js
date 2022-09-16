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

/*
export const ADD_PRODUCT = gql`
    mutation addProduct($name: String!, $brand: String, $size: String!, $description: String, $image: String, $quantity: Number, $price: Number, $user: User._id) {
        addProduct(
            name: $name
            brand: $brand
            size: $size
            description: $description
            image: $image
            quantity: $quantity
            price: $price
            user: $user._id
        )
    }
`*/
