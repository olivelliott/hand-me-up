// define every piece of data that the client can expect to work with

// TODO: how to set up the additional donation -- this could be an add-on product that's 'suggested to add to cart' on the checkout page? then, it will easily show up in the order as a product purchased

const { gql } = require("apollo-server-express");

const typeDefs = gql`

    type Category {
        _id: ID
        name: String
    }

    type Product {
        _id: ID
        name: String
        description: String
        image: String
        price: Float
        category: Category
    }

    type Order {
        _id: ID
        purchaseDate: String
        products: [Product]
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        orders: [Order]
    }

    type Checkout {
        session: ID
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {}

    type Mutation {}
`;

module.exports = typeDefs;
