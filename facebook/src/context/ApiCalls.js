import axios from "axios";
import { LoginStart, LoginSuccess, LoginFailure } from "./AuthAction";
export const login = async(user, dispatch)=>{
    try{
        dispatch({type:"LOGIN_START"});
        const res = await axios.post("/auth/login/", user)
        dispatch({ type:"LOGIN_SUCCESS", payload:res.data.others})
        console.log(res.data.others)
        
    }catch(err){
        console.log(err)
        dispatch({type:"LOGIN_FAILURE", payload:err.response.data});
    }
};
