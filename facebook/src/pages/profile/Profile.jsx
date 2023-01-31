import "./profile.scss";
import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightbar/RightBar"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import TimelinePosts from "../../components/timelinePost/TimelinePosts";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Share from "../../components/feed/Share";

const Profile = () => {
  const navigate = useNavigate();
  const id = useLocation().pathname.split("/")[2];
  const {user:currentUser} = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [follow, setFollow] = useState("");
  const [error, setError] = useState("")
  useEffect(()=>{
      const getsingleUser = async()=>{
        try{
          const res = await axios.get(`/user/find/${id}`);
          setUser(res.data);
        }catch(err){
          console.log(err.response.data);
        }
      };
      getsingleUser();
  },[id]);


  //getting user all friends 
  useEffect(()=>{
    const getUserFriends= async()=>{
      try{
        const res = await axios.get(`/user/friends/${id}`);
        setFriends( res.data);
        
      }catch(err){
        console.log(err.response);
      }
    }
    getUserFriends();
  },[id]);

  // get timeline posts 
  useEffect(()=>{
    const getTimeLinePosts= async()=>{
      try{
        const res = await axios.get(`/post/timeline/${id}`);
        setUserPosts(res.data)
      }catch(err){
        console.log(err.response.data);
      }
    }
    getTimeLinePosts();
  },[id, user]);


  //Follow 
  const handleFollow = async(e)=>{
    e.preventDefault();
    try{

      const res = await axios.put(`/user/${id}/follow`);
     setFollow(res.data);
     console.log(res)
    }catch(err){
      console.log(err.response.data);
    }
  }


  //HANDLING DELETE USER FUNCTION 
  const handleDeleteUser = async(id)=>{
    try{
      const res = await axios.delete(`/user/${id}`);
      if(res.status===200){
       navigate("/login");
      }
    }catch(err){
      setError(err.response.data)
    }

  }

  return (
    <>
    <Topbar />
    <div className="profile">
      <Sidebar />
      <div className="profileRight">
        <div className="profileRightTop">
            <img src={user.profilePicture || "https://images.pexels.com/photos/5947119/pexels-photo-5947119.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="" className="coverpic" />
        </div>
        <div className="profileRightBottom">
          <div className="settingContainer">
              <Link to={`/updateuser/${user._id}`} > <button >update Account</button></Link>
              <button className="deleteBtn" onClick={()=>handleDeleteUser(user._id)}>Delete Account</button>
          </div>
          <div className="profileItem">
              <img src={user.profilePicture} alt="" className="profileImage" />
            <span className="profilename">{user.username}</span>
            <span className="welcomeMessage"> Hello my friedn!</span>
              <span className="follow" onClick={handleFollow}>{currentUser?.followers.includes(user._id) ?"unfollow-":"Follow +"}</span>
              {follow && <span className="error" > {follow}</span>}
          </div>
        </div>
        {error && <span className="error">{error}</span>}
      <Share />
      <div className="timelineposts">
{userPosts.map((post)=>(

      <TimelinePosts  key={post._id} post={post} user={user}/>
))}
      </div>
      {/* <RightBar /> */}
      </div>
<div className="userInformation">
          <h1>User information </h1> 
          <p className="userInfoItem"><b>city:</b> {user?.city}</p>
          <p className="userInfoItem"><b>from:</b> {user?.country}</p>
          <div className="userFriends">
            <h1>User friends</h1>
         { friends.length<1 ?"You have no Friends":<>
         {friends.map((friend)=>( <div className="userFriend">
              <img src={friend.profilePicture || "https://images.pexels.com/photos/6248846/pexels-photo-6248846.jpeg?auto=compress&cs=tinysrgb&w=400"} alt="" />
              <span className="username">{friend.username}</span>
          </div>)) } </>}
          </div>
        </div>
    </div>
    </>
  )
}

export default Profile