const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");
// Put stripe here too


const resolvers = {};

module.exports = resolvers;



