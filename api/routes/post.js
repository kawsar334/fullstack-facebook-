

const express = require('express');
const router = express.Router();
const { addPost, updatePost, deletePost, getSinglePost, getAllPost, like, timelinePost } = require("../controllers/post");
const { verifyToken } = require('../verifyToken');
//CREATE POST 
router.post("/", verifyToken, addPost);

//UPDATE POST 
router.put("/:id", verifyToken,updatePost ); 
//DELTE POST 
router.delete("/:id",verifyToken, deletePost);
//GET A POST
router.get("/find/:id",getSinglePost) ;
//GET ALL POST
router.get("/",getAllPost) ;
//LIKE//DISLIKE
router.put("/like/:id",verifyToken, like);

//TIMELINE POST   
router.get("/timeline/:id", timelinePost)


module.exports = router;
