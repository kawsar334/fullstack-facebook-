

const express = require('express');
const router = express.Router();
const {verifyToken} = require("../verifyToken");
const { addComment, getComments } = require("../controllers/comment");


//ADD COMMENT 
router.post("/", verifyToken, addComment)

//GET COMMENTS
router.get("/:postId",verifyToken, getComments);

module.exports = router;
