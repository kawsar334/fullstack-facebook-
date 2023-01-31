const mongoose = require("mongoose");


 const DB = ()=>{
     mongoose.connect(process.env.MONGO_URL,)
    .then(()=>{
        console.log(`DB CONNECTED SUCCESFULLY !`);
    }).catch((err)=>{
        console.log(err);
    }); 
};   

module.exports = DB ;

