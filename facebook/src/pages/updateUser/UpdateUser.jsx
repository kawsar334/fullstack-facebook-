import "./updateUser.scss";
import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import Topbar from "../../components/topbar/Topbar"
import { AuthContext } from "../../context/AuthContext";

const UpdateUser = () => {
    const id = useLocation().pathname.split("/")[2];
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');
      
    //handling multiple inputs 
const handleInputs = (e)=>{
    setInputs((prev)=>{
        return{...prev, [e.target.name]:e.target.value}
    });
}

//HANDLING SUBMIT  FUNCTON 
const handleSubmit = async(e)=>{
    e.preventDefault();
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset", "facebook");
    try{
        const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/dmvmzwqkw/image/upload`, data);
      
        const res = await axios.put(`/user/${id}`, { ...inputs, profilePicture: uploadRes.data.secure_url, });
        if(res.status==200){
            navigate("/")
        }
       
    }catch(err){
        setError(err.response.data);
    }
}
  return (
   <>
          <Topbar />
          <div className="updateUser">
            <div className="upUserWrapper">
                <form action="" className="updateUserform">
                    <h1 className="updateHeader" style={{color:"crimson"}}>{error ? error:"Update your account" }</h1>
                    <label htmlFor="file">
                         {file?<img src={URL.createObjectURL(file)} /> : <img src="https://images.pexels.com/photos/6178714/pexels-photo-6178714.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />}
                    </label>
                    <input type="file" name="profilePicture" id="file" onChange={(e)=>setFile(e.target.files[0])} required  />
                    <input type="text" placeholder="city" name="city"  onChange={handleInputs} required/>
                    <input type="text" name="country" placeholder="country" onChange={handleInputs} required />
                    <button onClick={handleSubmit}>update</button>
                </form>
            </div>
          </div>  
   </>
  )
}

export default UpdateUser