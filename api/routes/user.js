

const express = require('express');
const router = express.Router();
const { verifyUser, verifyToken } = require("../verifyToken");
const { updateUser, deleteUser, getUser, getAllUsers, follow, getFriends } = require("../controllers/user");


//UPDATE USER   
router.put("/:id",verifyToken, updateUser ); 
// DELETE USER
router.delete("/:id", verifyUser, deleteUser)
// GET A USR
router.get("/find/:id", getUser);
// GET ALL USER 
router.get("/", getAllUsers);
//FOLLOW A USER
router.put("/:id/follow", verifyToken, follow) ;
//GET FRIENDS

router.get("/friends/:id", getFriends)



module.exports = router;
