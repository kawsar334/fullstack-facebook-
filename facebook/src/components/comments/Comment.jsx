import "./comment.scss"

import {format} from "timeago.js";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const Comment = ({ comment }) => {
const [user, setUser] = useState({});

  useEffect(()=>{
    const getUser = async()=>{
      try{
        const res = await axios.get(`/user/find/${comment.userId}`);
        setUser( res.data)
      }catch(err){
        console.log(err)
      }
    }
    getUser();
  },[comment.userId])
  return (
    <div className='comment'>
        <div className="commentWrapper">
           <div className="commentProfile">
                  <img src={user?.profilePicture} alt="" />
                  <span>{user?.username}</span>
                  <span className="commentTime">{format(comment.createdAt)}</span>
                  <span className="commentDesc">{comment.desc}</span>
            </div>
        
        </div>
    </div>
  ) 
}

export default Comment 