import "./register.scss"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setErorr] = useState(false)
  const navigate = useNavigate();

  console.log(password)

  const handleRegister= async(e)=>{
    e.preventDefault();
    try{
      setErorr(false)
      const res = await axios.post("/auth/register/", {username, password, email});
      console.log(res.data);
      if(res.status=== 200){
        navigate("/login")
        setErorr(false)
      }else{
        navigate("/register")
      }

    }catch(err){
      console.log(err.response);
      setErorr(true)
    }
  }

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h1 className="registerHeader">Newsbook</h1>
          <p>Connect wth friends and the world around you on Newsbook.</p>
        </div>
        <div className="registergRight">
          <form action="" className="registerForm">
            <input type="text" placeholder="username " minLength={6} required onChange={(e)=>setUsername(e.target.value)} />
            <input type="text" placeholder="Email "minLength={6} required onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="password "minLength={6} required  onChange={(e)=>setPassword(e.target.value)} />
            <button className="registerBtn" onClick={handleRegister}>Register</button>
            {error && <span style={{color:"crimson"}}> Something went wrong !</span>}
          </form>
          <Link to="#" className="forgotLink">Already have an Account?</Link>
          <Link to="/login" className="createLink">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register