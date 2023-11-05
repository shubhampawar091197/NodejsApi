const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        firstname:{
            type: String,
        required: [true, "Please add the first name"],
        },
        
        lastname:{
            type: String,
            required: [true,"Please enter the last name"],
        },
        email:{
            type: String,
            required: [true, "Please enter the email"],
        },
        phoneno:{
            type: String,
            required: [true,"Please enter the phone number"],
        },
        gender:{
            type: String,
            required:[true,"Please enter the gender"],
        },
        password:{
            type: String,
            required:[true,"Please enter the password"]
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("modelSchema",schema)
