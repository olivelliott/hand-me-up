// functions connected to each query or mutation that perform the CRUD actions

const { AuthenticationError } = require("apollo-server-express");
const { default: Stripe } = require("stripe");
const { User, Product, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");
// Put stripe here too


const resolvers = {

    // =======
    // QUERIES
    // =======
    Query: {
        // test db connection
        helloWorld: () => {
            return 'Hello, world!';
        },
        // GET all categories
        categories: async () => {
            return await Category.find();
        },
        // GET all products in a category
        products: async (parent, { category, name, user }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }

            return await Product.find(params).populate('category');
        },
        // GET single product by id
        product: async (parent, { _id }) => {
            return await Product.findById(_id).populate('category');
        },
        // GET single user by the token in the context which saves user._id
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category',
                    populate: 'products'
                });
                user.orders.sort((a, b) => b.purchaseData - a.purchaseDate);

                return user;
            }
            throw new AuthenticationError('Not logged in.')
        },
        // GET all users
        users: async () => {
            return User.find()
            .select('-__v')
        },
        // GET single order by id
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Not logged in.')
        },
        //TODO: checkout query if rough-coded to use stripe, add back in and test if implementing Stripe
        // checkout: async (parent, args, context) => {
        //     const url = new URL(context.headers.referer).origin;
        //     const order = new Order({ products: args.products });
        //     const { products } = await order.populate('products');
        //     const line_items = [];

        //     // loop over products from the Order model and push to new line_items array
        //     for (let i = 0; i < products.length; i++) {
        //         // generate products id
        //         const product = await stripe.products.create({
        //             name: products[i].name,
        //             description: products[i].description,
        //             images: [`${url}/images/${products[i].image}`]
        //         });
        //         // generate price id using the product id
        //         const price = await stripe.prices.create({
        //             product: product.id,
        //             unit_amount: products[i].price * 100,
        //             currency: 'usd'
        //         });
        //         // add price id to the line items array
        //         line_items.push({
        //             price: price.id,
        //             quantity: 1
        //         });
        //     }

        //     // use the line_items [] to generate a stripe checkout session
        //     const session = await stripe.checkout.sessions.create({
        //         payment_method_types: ['card'],
        //         line_items,
        //         mode: 'payment',
        //         success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        //         cancel_url: `${url}/cancel`
        //     });

        //     return { session: session.id };
        // }
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
        addOrder: async (parent, { products }, context) => {
            if (context.user) {
                const order = new Order({ products });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } } );

                return order;
            }

            throw new AuthenticationError('Not logged in.');
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in.');
        },
        updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;

            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
        addProduct: async (parent, args, context, { user, category }) => {
            if (context.user) {
                const product =  await Product.create(args);
                await User.findByIdAndUpdate(context.user._id, { $push: { products: product } }, { new: true } )
                // await Category.findByIdAndUpdate( { $push: { products: product } } )
                console.log(product);
                return product;
            }

            throw new AuthenticationError('Not logged in.');

        },
        deleteProduct: async(parent, { _id }) => {
          return await Product.findByIdAndDelete(_id)
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Invalid credentials.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Invalid credentials.');
            }

            const token = signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;



