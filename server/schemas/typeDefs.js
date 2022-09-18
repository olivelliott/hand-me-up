// define every piece of data that the client can expect to work with

// TODO: We need to make sure the Products that the user is creating is associated with that user
// product belongs to user as thought belongs to user in 'deep-thoughts- module
// user has an array of products
// needed to connect the product type to the user... did this by adding the user's email address to the product type
// added products to populate in the user query resolver
// model looks good to work with this
// updated seed file so each product has the email address of the seller

// TODO: AddProduct mutation that will return the User with their products for sale in an array
// I believe this will be taken care of now that the user query in the resolver has been updated to populate with the user's products

// ? how to set up the additional donation -- this could be an add-on product that's 'suggested to add to cart' on the checkout page?
// ? then, it will easily show up in the order as a product purchased.. maybe MVP has a few charities to choose from this way we can 
// ? create them as products that can be added to the cart in $1 increments?

// ? Also, do you want to do categories for the MVP? I think it will be easy but could prove to be harder than we thought. I've set it up so that they can access it if we decide yes
// I think since we've set it up on the backend, it should be OK to do for the MVP... could always scrap if it become problematic

// * I like the idea of the suggested add to cart for donations because I think it will work easier with stripe (if we do that)
// * We could also have it be a front end form on the product page with a drop down of different prices to choose from
// * with the base price being the one to cover the cost of shipping. That may prove to be more difficult to add to the model

// ! I'm going to add another model for our charities so that they don't have to be hard corded in the front end 

const { gql } = require("apollo-server-express");

const typeDefs = gql`

    type Category {
        _id: ID
        name: String
        products: [Product]
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
        category: [Category]
        user: [User]
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
        token: ID!
        user: User
    }

    type Query {
        helloWorld: String
        categories: [Category]
        products(category: ID, name: String): [Product]
        product(_id: ID!): Product
        user: User
        users: [User]
        order(_id: ID!): Order
        checkout(products: [ID]!): Checkout
    }

    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addOrder(products: [ID]!): Order
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        updateProduct(_id: ID!, quantity: Int!): Product
        login(email: String!, password: String!): Auth
        addProduct(name: String!, brand: String, size: String!, description: String, image: String, quantity: Int, price: Float, user: [ID]): Product
        deleteProduct(_id: ID): Product
    }
`;
// ! I think our problem is the category in the mutation is expecting a String but were referencing the Category schema in the typeDef above if that makes sense,
// ! I made it so that it does add it to the user database, but I can't seem to connect the category

// ? I dont know if the addProduct 'user' part is correct -
// ? I updated, i think this 99% it, i don't think we need the user id bc it's not an input field, but if needed, userID: ID! if doens't work... - cpm

module.exports = typeDefs;