const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  _id: {type:mongoose.Schema.Types.ObjectId, ref:"Signup", required: true},
    user_name: {type: String, ref:"Signup", required: true},
    password: {type: String, ref:"Signup", required: true}
});

module.exports = mongoose.model('loginSchema', loginSchema);
