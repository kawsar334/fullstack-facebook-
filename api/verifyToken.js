
const jwt = require("jsonwebtoken");
const verifyToken = async(req,res,next)=>{
    const token= req.cookies.token
    if(!token){
        return res.status(403).json("you are not authenticated !")
    }else{
        jwt.verify(token, process.env.SECRET, (err, user)=>{
            if(err){
                return res.status(403).json("invalid token !");
            }else{
                req.user = user ;
                next();

            }

        })
    }
}

//verify user 
const verifyUser = async(req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id ){
            console.log(req.user.id)
            console.log("slkadfjo;sdlajf");

            next();
        }else{
            res.status(403).json("you are not allowed in this field  ! ")
        }
    })
};


module.exports = { verifyToken, verifyUser };