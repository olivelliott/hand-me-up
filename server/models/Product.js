const mongoose = require("mongoose");
const { Schema } = mongoose;
// const Category = require('./Category')

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
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  price: {
    type: Number,
    min: 2.99,
  },
  category: {
    type: String
  },
  // category: [Category.schema],
  // category: [{
  //   type: Schema.Types.ObjectId.apply,
  //   ref: 'Category'
  // }],
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
