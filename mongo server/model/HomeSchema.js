const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('HomeSchema', homeSchema);
