import './App.css';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import {Routes, Route} from "react-router-dom";
import Profile from './pages/profile/Profile';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Messanger from './pages/messanger/Messanger';
import UpdatePost from './pages/updatePost/UpdatePost';
import UpdateUser from './pages/updateUser/UpdateUser';
 
function App() {
  const {user} = useContext(AuthContext);
  return (
    <Routes >
      <Route path='/' element={ !user ? <Login />:<Home />}/> 
      <Route path='/login' element={user ? <Home /> : <Login />}/>
      <Route path='/register' element={<Register/>} />
      <Route path='/profile/:id' element={<Profile />} />
      <Route path='/message' element={!user? <Login />:<Messanger />} />
      <Route path='/update/:id' element={!user ? <Login /> : <UpdatePost />} />
      <Route path='/updateuser/:id' element={!user ? <Login /> : <UpdateUser />} />


    </Routes>
  );
}

export default App;
