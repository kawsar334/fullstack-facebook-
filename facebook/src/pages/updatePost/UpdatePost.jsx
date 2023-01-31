import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import Topbar from "../../components/topbar/Topbar"
import { AuthContext } from "../../context/AuthContext";
import "./updatepost.scss"

const UpdatePost = () => {
    const id = useLocation().pathname.split("/")[2];
    const [file, setFile] = useState(null);
    const navigate= useNavigate();
    const {user} = useContext(AuthContext); 
    const [post, setPost] = useState({});
    const [desc, setdesc] = useState("");
    const [error ,setError] = useState("");

    useEffect(()=>{
        const getPost = async()=>{
            try{
                const res = await axios.get(`/post/find/${id}`);
                setPost(res.data);
            }catch(err){
                console.log(err.response.data);
            }
        }

        getPost();

    },[id]);


    //update post functionality 
    const handleUpdate = async(e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "facebook")
        data.append("upload_preset", "facebook");
        try{
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dmvmzwqkw/image/upload", data);
            const newPost = {
                desc,
                img: uploadRes.data.secure_url,
            }
          
                const res = await axios.put(`/post/${id}`, newPost);
                if (res.status === 200) {
                    navigate("/");

                }
           
            
        }catch(err){
            setError(err.response.data)
        }
    }
  return (
    <>
    <Topbar />
    <div className="updatePost">
    <div className="updatewrapper">
        <form action="" className="updateForm">
                  { error? <h1 style={{color:"crimson"}}>{error}</h1>:<h1>Update your post </h1>  }
                      <label htmlFor="file">
                            <span className="uploadText">Upload image</span>
                          {file ? <img src={URL.createObjectURL(file)} alt="" className="updateImg" required  /> :
                       
                       <img src={post?.img} alt="" className="updateImg" />}
                        
                        </label>
            <input type="file" name="" id="file" style={{display:"none"}} onChange={(e)=>setFile(e.target.files[0])} />
                      <input type="text" name="desc" placeholder={post.desc} onChange={(e) => setdesc(e.target.value)}/>
            <button onClick={handleUpdate}>Update</button>
        </form>
    </div>
    </div>
    </>
  )
}

export default UpdatePost