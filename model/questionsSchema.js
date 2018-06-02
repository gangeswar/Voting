const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId, required: true},
    question: {type: String, ref:"Option", required: true},
    start_date: {type: Date, ref:"Option", required: true},
    end_date: {type: Date, ref:"Option", required: true}
});

module.exports = mongoose.model('questionSchema', questionSchema);
