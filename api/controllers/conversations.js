const Conversation = require("../models/Conversations")



// ADD NEW CONVERSATIONS
const newConversations = async(req, res, next)=>{
    try{
        const newCon = new Conversation({
            members:[req.body.senderId, req.body.reciverId]
        });

        const saveConversations = await newCon.save();
        res.status(200).json(saveConversations);
    }catch(err){
        next(err);
    }
};
//GET CONVERSATIONS 
const getConversations = async(req, res, next)=>{
    try{
        const conversation = await Conversation.find({
            members:{$in:[req.params.userId]}
        });

        res.status(200).json(conversation);
    }catch(err){
        next(err);
    }
}




module.exports = { newConversations, getConversations }