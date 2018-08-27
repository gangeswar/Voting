const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('ProductSchema', productSchema);
