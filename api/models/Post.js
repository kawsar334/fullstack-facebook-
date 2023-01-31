const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    desc:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    like:{
        type: [String],
        default:[],
        
    },
    username:{
        type: String,
        required: true,  
    }

}, { timestamps: true });


module.exports = mongoose.model("Post", PostSchema)