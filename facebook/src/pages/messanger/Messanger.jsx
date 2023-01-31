import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversatios from "../../components/conversations/Conversatios";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./messanger.scss";
import { io } from "socket.io-client"
import { Suspense } from "react";


const Messanger = () => {
    const {user } = useContext(AuthContext);
    const [conversations,setConversations] = useState([]);
    const [currentChat ,setCurrentChat] =useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")


    //GETTING CONVERSATION
    useEffect(()=>{
        const getConversation=async()=>{
            try{
                const res = await axios.get(`/conversations/${user._id}`);
                setConversations(res.data)
            }catch(err){
                console.log(err)

            }
        }
        getConversation();
    },[user._id]);
    //getting mesage
    useEffect(()=>{
        const getMessage = async()=>{
            try{
                const res = await axios.get(`/message/getmessage/${currentChat?._id}`);
                setMessages(res.data);
                console.log(res.data);
            }catch(err){
                console.log(err)
            }

        }
        getMessage();

    },[currentChat?._id]);


    //SENDING NEW MESSAGE
    const handleNewMessage= async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post(`/message/`, { sender: user._id, text: newMessage, conversationId:currentChat._id });
        
                setNewMessage(" ")
           

        }catch(err){
            console.log(err);
        }
    }
  return (
    <>
        <Topbar />
        <div className="messanger">
            <div className="chatMenu">
                <div className="chatmenuWrapper">
                    <input type="text" placeholder="Search for friends..." className="chatMenuInput" />
                    
                      {conversations?.map((c)=>(
                            <div onClick={()=>setCurrentChat(c)}>

                          <Conversatios key={c._id} convarsation={c} currentUser={user}/>
                            </div>
                          ))}                      
                </div>
            </div>
            <div className="chatBox">
                <div className="chatboxWrapper">
                
                  { currentChat ? <>
                    <div className="chatboxTop">
                        
                              {messages.length < 1 ? <span className="recomend">Start Chat.</span>:<> {messages.map((m)=>(
                                    <Message key={m._id} message={m} own={m.serder === user._id }/>
                              ))}</>}
                    </div>
                      </> : <span className="recomend">open a conversation to start a chat.</span>}

                    <div className="chatboxBottom">
                          <textarea name="" placeholder="Write something..."  required className="chatMessageInput" onChange={(e) => setNewMessage(e.target.value)}></textarea>
                        <button className="chatSubmitBtn" onClick={handleNewMessage}>Send</button>
                    </div>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <h3>Active friends </h3>
                    <ChatOnline />
                      <ChatOnline />
                      <ChatOnline />
                      <ChatOnline />
                      <ChatOnline />
                      <ChatOnline />
                      


                </div>
            </div>

        </div>

    </>
  )
}

export default Messanger