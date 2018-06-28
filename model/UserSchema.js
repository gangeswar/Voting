const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_name: {
    type: String,
    required: true
  },
  email_id: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isadmin: {
    type: Number,
    default: 0
  }
});


module.exports = mongoose.model('UserSchema', userSchema);
