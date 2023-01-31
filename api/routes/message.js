const {verifyToken} = require("../verifyToken");
const router = require("express").Router();
const { addMessage, getMessage } =require("../controllers/message");


//ADD NEW MESSAGE 
router.post("/", addMessage );

//GET MESSAGES 
router.get("/getmessage/:conversationId",getMessage )






module.exports = router;