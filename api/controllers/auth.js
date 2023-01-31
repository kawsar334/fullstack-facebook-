
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER
module.exports.SIGNUP=async(req, res, next)=>{
    try{
        const newUser = new User({
            ...req.body,
            password:await bcrypt.hash(req.body.password, 10)
        });
        const savedUser = await newUser.save();

      return  res.status(200).json(savedUser);

    }catch(err){
        next(err);
    }
}
//LOGIN
// 
module.exports.SIGNIN = async (req, res, next) => {
    try {
      const user = await User.findOne({email:req.body.email});
      if(!user){
        return res.status(422).json("user not found !");
      }else{
        const hashedPassword = await bcrypt.compare(req.body.password, user.password);
        if(!hashedPassword){
          console.log(hashedPassword);
            return res.status(403).json("password not match !");
        }else{
            const token = jwt.sign({id:user._id, user:user,},process.env.SECRET,{expiresIn:"3d"});
            const {password,...others} = user._doc;
            res.cookie("token",token,{httpOnly:true}).json({others, token});
 
        }
      }
 
    } catch (err) {
        next(err);
    }
}

