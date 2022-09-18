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
        _id
      }
      user {
        _id
      }
    }
  }
`;

export const QUERY_PRODUCTS_BY_CATEGORY = gql`
  query productByCategory($category: ID) {
    productByCategory(category: $category) {
      _id
      name
      brand
      size
      description
      image
      quantity
      price
    }
  }
`;

export const QUERY_SINGLE_PRODUCT = gql`
  query getSingleProduct($id: ID!) {
    product(_id: $id) {
      _id
      name
      description
      price
      quantity
      image
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
