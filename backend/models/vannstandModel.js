const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vannstandSchema = new Schema({
    niva:  {
        type: Number,
        required: [true, "Please add water level."]
    }
}, 
{
    timestamps: true
});

const vannstandModel = mongoose.model('vannstand', vannstandSchema); 
module.exports = vannstandModel;
