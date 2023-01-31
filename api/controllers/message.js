const Message = require("../models/Message");





//ADD MESSAGE 
const addMessage = async(req, res, next)=>{
    try{
        const newMessage = new Message(req.body);
        const saveMessage = await newMessage.save();
        res.status(200).json(saveMessage);
    }catch(err){
        next(err);
    }
};

//GETTING MESSAGE 

const getMessage= async(req, res, next)=>{
    try{
        const messages = await Message.find({
            conversationId:req.params.conversationId
        });


        res.status(200).json(messages);

    }catch(err){
        next(err);
    }
}




module.exports = { addMessage, getMessage };

