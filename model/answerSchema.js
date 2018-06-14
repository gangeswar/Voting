const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId, required: true},
    user_id: {type:mongoose.Schema.Types.ObjectId, ref:"userSchema", required: true},
    question_id: {type:mongoose.Schema.Types.ObjectId, ref:"questionSchema", required: true},
    option_id: {type:mongoose.Schema.Types.ObjectId, ref:"optionSchema", required: true},
});

module.exports = mongoose.model('answerSchema', answerSchema);
