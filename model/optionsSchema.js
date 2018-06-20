const mongoose = require("mongoose");

const optionSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questionSchema",
        required: true
    },
    option: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('optionSchema', optionSchema);
