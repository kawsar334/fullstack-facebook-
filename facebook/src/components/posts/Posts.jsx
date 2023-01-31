import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from 'timeago.js';
import "./post.scss";
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from "../../context/AuthContext";
import Comments from "../comments/Comments";

const Posts = ({post}) => {
  const [like, setLike] = useState(post.like.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext)
  const [openModel, setOpenModel] = useState(false);
  const [error, setError] = useState(null);
  const [openComments, setOpenComments] = useState(false)
  const handleLike =async ()=>{
    try{
      const res = await axios.put(`/post/like/${post?._id}`);
      console.log(res.data)


    }catch(err){
      console.log(err.response.data);
    }
    setLike(isLiked ? like-1 :like+1)
    setIsLiked(!isLiked);
  

  }

  ///get user 
  useEffect(()=>{
    const getUser= async()=>{
      try{
        const res = await axios.get(`/user/find/${post?.userId}`);
       setUser(res.data)
      }catch(err){
        console.log(err)
      }
      
    };
    getUser();
  }, [post.userId])

  //handle delete function
  const handleDelete =async(id)=>{
    try{
      const res = await axios.delete(`/post/${id}`);
      console.log(res.data); 

    }catch(err){
      setError(err.response.data);
    }
  }


  return (
  <>
    {!post ?
          <CircularProgress />
          :
    <div className="post">
      
         <div className="postwrapper">
          <div className="postTop">
          
            <div className="postLeft">
                <img src={user?.profilePicture} alt="" className="postProfileImg" />
            <Link to={`/profile/${user?._id}`} className="postusername">{user?.username} </Link>
            <span className="postdate"> {format(post.createdAt)}  </span>
            {error && <span className="error">{error}</span>}
            </div>
            <div className="postRight">
            <i className="fa-solid fa-ellipsis-vertical" onClick={()=>setOpenModel(!openModel)}></i>
            { openModel &&<div className="model">
                <Link to="#"onClick={()=>handleDelete(post._id)} >Delete post</Link>
                <Link to={`/update/${post._id}`}>update post</Link>
              </div>}
            </div>
          </div>
          <div className="postcenter">
            <span className="postText">{post.desc} :)</span>
              <img src={post.img || "https://images.pexels.com/photos/1288182/pexels-photo-1288182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="Loading..." className="postImg" />
          </div>
          <div className="postBottom">
            <div className="postbottomleft">
                {isLiked ? <i class="fa-solid fa-thumbs-up likeicon" style={{color:"crimson"}} onClick={handleLike}></i> : <i className="fa-regular fa-thumbs-up likeicon" onClick={handleLike}></i>}
            {/* {post.like.includes(currentUser._id) ? "Loved":<i className="fa-regular fa-heart likeicon"></i>} */}
            <span className="likecounter" >{like} people like it.</span>
            </div>
            <div className="postbottomright">
              <div className="postcommenttext" onClick={()=>setOpenComments(!openComments)}>
                  Comments. <i class="fa-solid fa-chevron-down"></i>
              </div>

            </div>
          </div>
         {openComments && <>
          <Comments userId={currentUser._id} postId={post._id} setOpenComments={setOpenComments} />
          </>}
         </div>
    </div>
}
      </>
  )
}

export default Posts