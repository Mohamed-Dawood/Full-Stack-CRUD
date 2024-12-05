const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please enter product name'] },
    type: { type: String, required: [true, 'Please enter product type'] },
    quantity: { type: Number, required: true, default: 1 },
    description: {
      type: String,
      required: [true, 'Please enter product Description'],
    },
    price: {
      type: Number,
      required: [true, 'Product should have price'],
      default: 0,
    },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
