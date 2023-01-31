
const Comment = require("../models/Comment");

//ADD COMMENT 
const addComment = async(req, res,next)=>{
    try{
        const newComment = new Comment({...req.body, userId:req.user.id})

        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    }catch(err){
        next(err);
    }
}

//GET  COMMENT 
const getComments = async (req, res, next) => {  
    try {
        const postId = req.params.postId ;
        const comments= await Comment.find({postId:postId});
        res.status(200).json(comments)

    } catch (err) {
        next(err);
    }
}
//UPDATE COMMENT 
//DELETE COMMENT 


module.exports= {addComment, getComments}
