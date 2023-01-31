import axios from "axios";
import { Suspense, useEffect } from "react";
import { useState } from "react";
import "./consversations.scss";

const Conversatios = ({ convarsation, currentUser }) => {
  const [user, setUser] = useState({});
  const friendId= convarsation.members.find((m)=>m !== currentUser._id)

  useEffect(()=>{

    const getUser= async()=>{
      try{
        const res = await axios.get(`/user/find/${friendId}`);
        setUser(res.data)
      }catch(err){
        console.log(err);
      }
    };
    getUser()

  },[currentUser, convarsation])

  return (

    <div className="conversations">
      <img src={user?.profilePicture}alt="" className="conversationImg" />
        <span className="coversationName">{user?.username}</span>
    </div>
  )
}

export default Conversatios