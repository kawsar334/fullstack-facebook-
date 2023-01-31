import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./share.scss"

const Share = () => {
    const [desc, setDesc] = useState("")
    const [file, setFile]= useState(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);


    // const link =  "https://api.cloudinary.com/v1_1/dmvmzwqkw/image/upload"

    const handleClick = async(e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append("file",file);
        data.append("upload_preset","facebook" );
        try{
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dmvmzwqkw/image/upload",data );
            const newPost= {
                desc, 
                img:uploadRes.data.secure_url
            }
            const res = await axios.post("/post/",newPost);
            if(res.status===200){
               window.location.reload();
            }
          

        }catch(err){
            console.log(err)
        }
    };


  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                  <img src={user.profilePicture || "https://images.pexels.com/photos/1288182/pexels-photo-1288182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" className="shareProfilePicture" />
                <input type="text" name="desc" placeholder="whats in You mind..." onChange={(e)=>setDesc(e.target.value)} />
            </div>
              {file &&<img src={ URL.createObjectURL(file)} alt="" className="URLIMG" />}
            
            <hr className="shareHr" />
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <label htmlFor="file" style={{cursor:"pointer"}}>
                          <i className="fa-solid fa-photo-film" style={{color:"tomato" , cursor:"pointer"}}></i>
                        </label>
                          <input type="file" id="file" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])} />
                          <label htmlFor="file" className="shareOptionText" style={{ cursor: "pointer" }} >photo or video</label >
                    </div>
                      <div className="shareOption">
                          <i class="fa-solid fa-tag" style={{color:"blue"}}></i>
                          <span className="shareOptionText" >Tag</span>
                      </div>
                      <div className="shareOption">
                          <i class="fa-solid fa-location-pin" style={{color:"green"}}></i>
                          <span className="shareOptionText">Location</span>
                      </div>
                      <div className="shareOption">
                          <i class="fa-regular fa-face-smile" style={{color:"yellow"}}></i>
                          <span className="shareOptionText">Feelings</span>
                      </div>
                </div>
            </div>
            <button className="shareButton" onClick={handleClick}>Share</button>
        </div>
    </div>
  )
}

export default Share