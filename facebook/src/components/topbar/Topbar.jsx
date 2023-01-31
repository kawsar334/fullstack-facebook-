import "./topbar.scss";
import {Link, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const Topbar = () => {
    const {user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = ()=>{
        dispatch({ type:"LOGOUT"});
        navigate("/login")
        window.location.reload();


    }
  return (
    <div  className="topbarContainer">
          <Link to="/"className="topbarMenu"><i className="fa-brands fa-facebook"></i></Link>
        <div className="topbarLeft">
            <Link  to="/"className="logo">Facebook</Link>
        </div>
        <div className="topbarCenter">
            <input type="text" className="searchInput" placeholder="Search" />
              <i className="fa-solid fa-magnifying-glass searchIcon"></i>
        </div>
        <div className="topbarRight">
            <div className="topbarLinks">
                <Link to="/" className="topbarLink">HOME</Link>
                <span to={`/profile/${user?._id}`} className="topbarLink" style={{cursor:"pointer"}} onClick={handleLogout}>LOGOUT</span>
            </div>
           <div className="topbarIcons">
                <div className="topbarIconItem">
                        <i className="fa-regular fa-user "></i>
                        <span className="topbarIconBadge">1</span>
                </div>
                  <Link to="/message"className="topbarIconItem">
                      <i class="fa-regular fa-message"></i>
                      <span className="topbarIconBadge">1</span>
                  </Link>
                  <div className="topbarIconItem">
                      <i class="fa-regular fa-bell"></i>
                      <span className="topbarIconBadge">1</span>
                  </div>
          </div>
          <Link to={`/profile/${user?._id}`} >
              <img src={user?.profilePicture ||"https://images.pexels.com/photos/14881779/pexels-photo-14881779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" className="topbarImg" />
          </Link>
            
        </div>
    </div>
  )
};

export default Topbar