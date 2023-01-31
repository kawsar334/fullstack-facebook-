const User = require("../models/User");
const bcrypt =require("bcrypt");

//UPDATE USER 
const updateUser= async(req, res, next)=>{
    try{

        if(req.user.id === req.params.id){
            if (req.body.pasword) {
                req.body.password = await bcrypt.hash(req.body.password, 10)
            }
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatedUser);
        }else{
            return res.status(403).json("you can't update  this account !")
        }
       
    }catch(err){
        next(err);
    }
}
//DELETE USER
const deleteUser = async (req, res, next) => {
    try {
        if(req.user.id === req.user.id){
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(403).json("user Not found !");
            } else {
                await User.findByIdAndUpdate(req.params.id);
                res.status(200).json("user deleted successfully !")
            }
        }else{
            return res.status(402).json("You Can't Delete this Account! ")
        }
       
    } catch (err) {
        next(err);
    }
} 
//GETUSER 
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json(user);

    } catch (err) {
        console.log(err)
        next(err);
    }
}
//GET ALL USER
const getAllUsers = async (req, res, next) => {
    try { 
        const users = await User.find();
        return res.status(200).json(users);

    } catch (err) {
        next(err);
    }
}
//follow a user 
const  follow = async(req, res, next)=>{
    try{
        const user = await User.findById(req.user.id); 
        if(!user.followers.includes(req.params.id)){
            await User.findByIdAndUpdate(req.user.id, {
                $push: { followers: req.params.id }
            });
            // await User.findByIdAndUpdate(req.params.id, { $inc:{followings:1} });
            res.status(200).json("user hasbeen followed !")
        }
        else{
            await User.findByIdAndUpdate(req.user.id, { $pull: { followers: req.params.id },});
            res.status(200).json("unfollowed succesfully !");

        };
    }catch(err){
        next(err);
        console.log(err)
    }
}


//GET USER FRIENDS

const getFriends= async(req, res,next)=>{
    try{
    const user = await User.findById(req.params.id);
    const lists = await Promise.all(user.followers.map((friend)=>{
        return User.findById({ _id: friend });
    }))
        
    res.status(200).json(lists);
    }catch(err){
        next(err);
    } 
}
 

module.exports = { updateUser, deleteUser, getAllUsers, getUser, follow, getFriends }