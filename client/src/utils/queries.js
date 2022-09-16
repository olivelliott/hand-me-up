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
      user
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

// I believe only necessary if we do a profile page, but just in case
export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      email
        products {
          _id
          name
          brand
          size
          description
          image
          quantity
          price
          category
        }
      }
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

