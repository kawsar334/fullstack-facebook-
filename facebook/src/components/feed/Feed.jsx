import Posts from "../posts/Posts";
import "./feed.scss";
import Share from "./Share";
// import { posts } from "../../dummyData"
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Feed = () => {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    const getPosts= async()=>{
      try{
        const res = await axios.get(`/post/`);
        setPosts(res.data); 
      }catch(err){
        console.log(err.response);
      } ;
 
    }
    getPosts();
  },[])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post)=>(
          <Posts key={post._id} post={post} />

        ))}
      
      </div>
    </div>
  )
}

export default Feed