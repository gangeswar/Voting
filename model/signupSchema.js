const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_name: {type: String, required: true},
    email_id: {
      type: String,
      required: true,
      unique: true,
      match: /[[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}]/
    },
    password: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('signupSchema', signupSchema);
