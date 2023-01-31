
const express = require("express");
const app = express();
const env = require('dotenv');
const  DB = require("./DB");
env.config();
const PORT = process.env.PORT || 4005 ;
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const conversationsRoute = require("./routes/conversations");
const messageRoute = require("./routes/message");
const commentRoute = require("./routes/comment");
const cookiParser = require("cookie-parser")




app.use(express.json());
app.use(cookiParser());
app.use("/api/auth",authRoute );
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/message", messageRoute);
app.use("/api/comment", commentRoute);






//middleware 
app.use((err, req, res, next)=>{
    const message = err.message || "Something went Wrong ";
    const status = err.status || 500;
    return res.status(status).json({
        message,
        status,
        success:false,
    });
})


DB();
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})