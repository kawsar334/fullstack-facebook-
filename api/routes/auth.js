

const express = require('express');
const router = express.Router();
const { SIGNUP, SIGNIN } = require("../controllers/auth");
 
//SIGNUP 
router.post("/register", SIGNUP);
 
//SIGNIN 
router.post("/login", SIGNIN);
 

 
module.exports = router ; 