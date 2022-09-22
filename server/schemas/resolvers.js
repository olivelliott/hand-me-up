// functions connected to each query or mutation that perform the CRUD actions

const { AuthenticationError } = require("apollo-server-express");
const { default: Stripe } = require("stripe");
const { User, Product, Category, Order, Charity } = require("../models");
const { signToken } = require("../utils/auth");
// Put stripe here too

const resolvers = {
  // =======
  // QUERIES
  // =======
  Query: {
    // test db connection
    helloWorld: () => {
      return "Hello, world!";
    },
    // GET all categories
    categories: async () => {
      return await Category.find();
    },
    // GET all products by category
    productByCategory: async (parent, { category }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      console.log(params);
      return await Product.find(params).populate('category');
    },
    // GET all products
    products: async () => {
      return await Product.find().populate("user");
    },
    // GET single product by id
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },
    // GET single user by the token in the context which saves user._id
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
          populate: "products",
        });
        user.orders.sort((a, b) => b.purchaseData - a.purchaseDate);

        return user;
      }
      throw new AuthenticationError("Not logged in.");
    },
    // GET all users
    users: async () => {
      return User.find().select("-__v");
    },
    // GET single order by id
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in.");
    },
    // GET all charities
    charities: async () => {
      return Charity.find()
    }
  },

  // =========
  // MUTATIONS
  // =========
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in.");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in.");
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    addProduct: async (parent, args, context, { user, category }) => {
      if (context.user) {
        console.log(args.category);

        const product = await Product.create(args);
        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { products: product } },
          { new: true }
        );
        return product;
      }

      throw new AuthenticationError("Not logged in.");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid credentials.");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid credentials.");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
