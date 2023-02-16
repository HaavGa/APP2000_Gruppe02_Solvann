const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Trenger noe middleware et eller annet sted for å
// sjekke om passordet er valid og om brukernavnet
// er tatt eller ikke. Om passordet er valid kan sjekkes
// front end. brukernavnet må være unikt så det må jeg 
// gjøre her i backend.

const userSchema = new Schema({
    firstName:  {
        type: String,
        required: [true, "Please add a first name."]
    },
    lastName:   {
        type: String,
        required: [true, "Please add a last name."]
    },
    password:   {
        type: String,
        required: [true, "Please add a password."]
    },
    username:   {
        type: String,
        required: [true, "Please add a username."]
    },
    email:      {
        type: String,
        required: [true, "Please add an email."]
    }
}, 
{
    timestamps: true
});

const userModel = mongoose.model('user', userSchema); 
module.exports = userModel;
