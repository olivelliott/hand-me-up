// define every piece of data that the client can expect to work with
// TODO: We need to make sure the Products that the user is creating is associated with that user
// TODO: AddProduct mutation that will return the User with their products for sale in an array

// ? how to set up the additional donation -- this could be an add-on product that's 'suggested to add to cart' on the checkout page?
// ? then, it will easily show up in the order as a product purchased.. maybe MVP has a few charities to choose from this way we can 
// ? create them as products that can be added to the cart in $1 increments?

// ? Also, do you want to do categories for the MVP? I think it will be easy but could prove to be harder than we thought. I've set it up so that they can access it if we decide yes

// * I like the idea of the suggested add to cart for donations because I think it will work easier with stripe (if we do that)
// * We could also have it be a front end form on the product page with a drop down of different prices to choose from
// * with the base price being the one to cover the cost of shipping. That may prove to be more difficult to add to the model

// ! I'm going to add another model for our charities so that they don't have to be hard corded in the front end 

const { gql } = require("apollo-server-express");

const typeDefs = gql`

    type Category {
        _id: ID
        name: String
    }

    type Product {
        _id: ID
        name: String
        brand: String
        size: String
        description: String
        image: String
        quantity: Int
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
        products: [Product]
    }

    type Checkout {
        session: ID
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        helloWorld: String
        categories: [Category]
        products(category: ID, name: String): [Product]
        product(_id: ID!): Product
        user: User
        order(_id: ID!): Order
        checkout(products: [ID]!): Checkout
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addOrder(products: [ID]!): Order
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        updateProduct(_id: ID!, quantity: Int!): Product
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
