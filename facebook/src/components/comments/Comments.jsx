import "./comments.scss"
import Comment from './Comment'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
const Comments = ({ userId, postId, setOpenComments }) => {
  const {user} =useContext(AuthContext)
const [desc, setDesc] = useState("");
const [comments, setComments] = useState([]);


//ADD NEW COMMENTS
const addComment= async()=>{
  try{
    const res = await axios.post(`/comment/`, {desc, postId, });

    if(res.status=== 200){
      window.location.reload();
    }
  }catch(err){ 
    console.log(err)
  }
}
 
useEffect(()=>{
  const getComments=async()=>{
    try{
      const res = await axios.get(`/comment/${postId}`);
      console.log(res.data)
      setComments(res.data)
    }catch(err){
      console.log(err.response);
    }
  }
  getComments();
},[postId]);

  return (
    <div className='comments'>
        <div className="commentsWrapper">
              <img src={user.profilePicture} alt=""  className='commentPic'/>
        <input type="text" placeholder='Add comment.' onChange={(e) => setDesc(e.target.value)}/>
        <button onClick={addComment}>Add</button>
        </div>


{comments.map((c)=>(
  <Comment key={c._id} comment={c} />

))}
        

      <span onClick={() => setOpenComments(false)} className="close">Hide comments <i class="fa-solid fa-chevron-up"></i> </span>

    </div>
  )
}

export default Comments