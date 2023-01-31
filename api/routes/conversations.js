const {verifyToken} = require("../verifyToken");
const router = require("express").Router();
const { newConversations, getConversations } = require("../controllers/conversations");

// New conversations
router.post("/",newConversations );
//GET CONVERSAITON OF A USER
router.get("/:userId", getConversations);

module.exports = router ;                        