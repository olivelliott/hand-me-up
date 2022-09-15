const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  price: {
    type: Number,
    // ! This could be where we require the base shipping price
    min: 0.99,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
