import React, { useState } from 'react';
import bgImage from "../asset/login Background.png"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { requireNoAuth } from '../config/auth';
import { API_ENDPOINTS } from "../config/url";


// Define the props interface
interface LoginProps {

}

const Login: React.FC<LoginProps> = ({ }) => {
  requireNoAuth();
  const [email, serEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post(API_ENDPOINTS.LOGIN, { email, password })
      .then((res) => {
        console.log(res)
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("user", JSON.stringify(res.data.user));
        window.localStorage.setItem("userId", res.data.user._id);

        navigate('/');
      })
      .catch(err => console.log(err));


  }

  return (
    <>
      <div className='h-screen m-auto flex justify-center items-center ' style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <div className='bg-white flex justify-between items-center px-5 py-5 rounded-md shadow-xl mr-20 ml-20 mt-30 mb-30'>
          <div className=' rounded-md ' style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            <img className="size-55 shrink-0 " src="../src/asset/login.png" alt="image" />
          </div>
          <div className='flex flex-col justify-center pl-10 pr-5'>
            <div className='flex flex-col justify-center items-center mb-3'>
              <h1 className='text-1xl font-bold'>Sign In</h1>
              <p className='text-xm'>Unlock your World</p>
            </div>
            <form action="" className='flex flex-col gap-1'>
              <label htmlFor="email" className='text-sm'><span className='text-red-500'>*</span>Email</label>
              <input type="text" placeholder='Enter Your Email' required className='border border-gray-300 rounded-md pl-2 pt-1 pb-1 text-xs' onChange={(e) => serEmail(e.target.value)} />

              <label htmlFor="password" className='text-sm'><span className='text-red-500'>*</span>Password</label>
              <input type="Password" placeholder='Enter Your Password' required className='border  border-gray-300  rounded-md pl-2 pt-1 pb-1 text-xs ' onChange={(e) => setPassword(e.target.value)} />

              <div className="flex gap-3 justify-center items-center my-1">
                <label  className='text-sm '><input type="checkbox"/>Remember me</label>
                <a   className='text-xs text-blue-400'><Link to='/forgotPassword'>Forget Password</Link></a>
              </div>
            </form>
            <div className='flex flex-col gap-2 mt-3'>
              <button className='bg-blue-600 rounded-md text-white py-1 cursor-pointer text-sm' onClick={handleSubmit}>Sign In</button>
              <button className='border border-gray-300 text-gray-700 rounded-md py-1 cursor-pointer text-sm'><Link to="/register">creat an account</Link></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;