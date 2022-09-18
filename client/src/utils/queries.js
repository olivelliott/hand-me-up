import { gql } from "@apollo/client";

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      brand
      size
      description
      image
      quantity
      price
      category {
        name
      }
      user {
        email
        _id
      }
    }
  }
`;

export const QUERY_SPECIFIC_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;


export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

// TODO: Test functionality
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

