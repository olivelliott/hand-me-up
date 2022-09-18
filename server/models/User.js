const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");
const Order = require("./Order");
const Product = require("./Product");
// const Category = require("./Category");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  // * can connect order schema here for order history if we have time
  orders: [Order.schema],
  // * this connects our user with THEIR products that they have for sale
  products: [Product.schema],
  // categories: [Category.schema],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
