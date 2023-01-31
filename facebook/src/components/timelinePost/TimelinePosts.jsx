import "./timelinepost.scss";

const TimelinePosts = ({ post, user }) => {
  return (
    <>
    <div className="timelinContainer">
        <div className="timelineTop">
            <div className="postUser">
                  <img src={user.profilePicture || "https://images.pexels.com/photos/15283479/pexels-photo-15283479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt=""  className="timelineProfile"/>
                <span>{user.username}</span>
            </div>
        </div>
        <div className="timelineCenter">
                  <img src={post.img ? post.img : "https://images.pexels.com/photos/15283479/pexels-photo-15283479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt=""  className="postImg"/>
        </div>
        <div className="timelineBottom">
            <div className="likeContainer">
                  <i className="fa-regular fa-thumbs-up likeicon" ></i>
                  <i className="fa-regular fa-heart likeicon"></i>
                  <span>{post.like.length} people like this </span>
            </div>
            <span className="comment">9 comments</span>
        </div>
    </div>
          
    </>
  )
}

export default TimelinePosts