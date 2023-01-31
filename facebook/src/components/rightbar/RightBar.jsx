import "./rightbar.scss";

const RightBar = () => {
  return (
    <div className="rightbar">
      <div className="rightbarwrapper">
        <div className="birthdayContainer">
          <img src="https://images.pexels.com/photos/4397903/pexels-photo-4397903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Loading..." className="birthdayImg" />
          <span className="birthdayText"><b>kawsar</b>And <b>3 other friends </b>have a birthday today</span>
        </div>
        <img src="https://images.pexels.com/photos/6231730/pexels-photo-6231730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online friends.</h4>
        <ul className="rightbarfriendList">
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img src="https://images.pexels.com/photos/5947119/pexels-photo-5947119.jpeg?auto=compress&cs=tinysrgb&w=400" alt="..." className="rightbarProfileImg" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightUsername">kawsar firoz</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img src="https://images.pexels.com/photos/5947119/pexels-photo-5947119.jpeg?auto=compress&cs=tinysrgb&w=400" alt="..." className="rightbarProfileImg" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightUsername">kawsar firoz</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img src="https://images.pexels.com/photos/5947119/pexels-photo-5947119.jpeg?auto=compress&cs=tinysrgb&w=400" alt="..." className="rightbarProfileImg" />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightUsername">kawsar firoz</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RightBar