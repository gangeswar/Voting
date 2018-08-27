const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true,
    unique: true
  }
});


module.exports = mongoose.model('UserSchema', userSchema);
