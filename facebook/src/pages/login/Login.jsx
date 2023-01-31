import "./login.scss";
import {Link} from  "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../context/ApiCalls";
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, isFetching, user, error } = useContext(AuthContext);
  const handleSubmit = async(e)=>{
    e.preventDefault();
  
     login({email, password}, dispatch)

   
  }
  return (
    <div className="login">
      <div className="loginWrapper">
      <div className="loginLeft">
        <h1 className="loginHeader">Newsbook</h1>
        <p>Connect wth friends and the world around you on Newsbook.</p>
      </div>
     
      <div className="logingRight">
          <form action="" className="loginForm" required  onSubmit={handleSubmit}>
            <input type="text" placeholder="Email "required   onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="password "required   onChange={(e) => setPassword(e.target.value)} />
            <button className="loginBtn" disabled={isFetching}>{isFetching ? <CircularProgress size="20px" color="secondary" /> :"Log In"}</button>
            {error && <span style={{color:"crimson", textTransform:"capitalize",borderBottom:"1px solid crimson"}}>{`${error}`}</span>}
        </form>
        <Link to="#" className="forgotLink">Forgot password?</Link>
        <Link to="/register" className="createLink">Create a New Account </Link>
      </div>
      </div>
    </div>
  )
}

export default Login