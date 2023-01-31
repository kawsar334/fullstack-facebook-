const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

username:{
    type:String,
    required:true,
},

    email: {
        type: String,
        required: true,
        uniquie:true
    },
    password:{
        type: String,
        required: true,
    },
    country: {
        type: String,
 
    },
    city:{
        type: String,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type: Number,
        default:0
    },
    isAdmin:{
        type:Boolean, 
        default:false
    }
    

},{timestamps:true});


module.exports = mongoose.model("User", userSchema)