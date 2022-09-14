// functions connected to each query or mutation that perform the CRUD actions

const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");
// Put stripe here too


const resolvers = {
    Query: {
        helloWorld: () => {
            return 'Hello, world!';
        }
    }
};

module.exports = resolvers;



