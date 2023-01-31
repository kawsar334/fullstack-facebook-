import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightbar/RightBar"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import "./home.scss"

const Home = () => {
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <RightBar /> 
      </div>


    </div>
  )
}

export default Home