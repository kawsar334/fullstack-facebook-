import "./message.scss";
import {format} from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own":"message"}>
        <div className="messageTop">
              <img src="https://images.pexels.com/photos/14612872/pexels-photo-14612872.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" className="messageImg" />
        <p className="messageText">{message?.text} </p>
        </div>

        {/*  */}
        <div className="messageBottom">
        {format(message.createdAt)}
        </div>
    </div>
  )
}

export default Message