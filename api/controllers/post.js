const Post = require("../models/Post");
const User = require("../models/User");



//CREATE POST
const addPost = async(req, res, next)=>{
    try{
        const post =new Post({...req.body, userId:req.user.id, username:req.user.user.username});
        const savePost = await post.save();
        res.status(200).json(savePost);
    }catch(err){
        next(err);
    };
}
//UPDATE POST
const updatePost = async (req, res, next) => {
    try {
        const userId = req.user.id ;
        const postId = await Post.findById(req.params.id);
if(userId === postId.userId){
    const post = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(post)
}else{
    return res.status(403).json("you can update only your post !");
}
    }catch (err) {
        next(err);
    }
}
//DELETE POST
const deletePost = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const postId = await Post.findById(req.params.id);
        if(userId === postId.userId){
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(403).json("post Not Found !");
            } else {
                await Post.findByIdAndDelete(req.params.id);
                res.status(200).json("post hasbeen deleted ");
            }
        }else{
            return res.status(403).json("you  can delete only your Post !")
        }
    } catch (err) {
        next(err);
    }
}
//GET A POST 
const getSinglePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch (err) {
        next(err);
    }
}
//GET ALL POST 
const getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);

    } catch (err) {
        next(err);
    }
}
//LIKE 
const like = async (req, res, next) => {
    try {
        const user = req.user ;
        const post = await Post.findById(req.params.id)
        // res.status(200).json(post)
    if(!post.like.includes(user.id)){
        await Post.findByIdAndUpdate(req.params.id, {$push:{like:req.user.id}});
        res.status(200).json("liked added in this post !") ;
    }else{
        await Post.findByIdAndUpdate(req.params.id, {$pull:{like:req.user.id}});
        res.status(403).json(" Disliked this  post!");
    }
    } catch (err) {
        next(err);
    }
};

//GET TIMELINE POSTS
const timelinePost = async (req, res, next) => {
    try {
    const user = await User.findById(req.params.id);
//     const followers = user.followers;
//     const lists = await Promise.all(followers.map((id)=>{
//         return Post.find({userId:id});
//     }))
// return res.status(200).json(lists.flat()); 
    const posts =await Post.find({userId:user._id}); 
    res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        next(err);
    }
};




module.exports = {addPost, updatePost, deletePost, getSinglePost, getAllPost, like, timelinePost}