import React, { useState } from 'react';
import bgImage from "../asset/login Background.png"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { logOut, requireAuth } from '../config/auth';
import { API_ENDPOINTS } from "../config/url";


// Define the props interface
interface LoginProps {

}

const ChangePassword: React.FC<LoginProps> = ({ }) => {
    requireAuth();
    const [priviousPassword, SetPriviousPassword] = useState("");
    const [newPassword, SetNewPassword] = useState("");

    const [Confirmpassword, SetConfirmPassword] = useState("");
    const navigate = useNavigate();




    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword === Confirmpassword) {
            axios.post(API_ENDPOINTS.CHANGE_PASSWORD,

                { priviousPassword, newPassword },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
                .then((res) => {
                    console.log(res.data.updatedUser);
                    window.alert("Password Change SuccessFull");

                    return logOut();
                })
                .catch(err => console.log(err));
                return;

        }
        return window.alert("Confirm Password not matched")

    }

    return (
        <>
            <div className='h-screen m-auto flex justify-center items-center ' style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <div className='bg-white flex justify-between items-center px-5 py-5 rounded-md shadow-xl mr-20 ml-20 mt-30 mb-30 w-[60%]'>
                    <div className=' rounded-md ' style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}>
                        <img className="size-55 shrink-0 " src="../src/asset/login.png" alt="image" />
                    </div>
                    <div className='flex flex-col justify-center pr-10 w-[50%]'>
                        <div className='flex flex-col justify-center items-center mb-3'>
                            <h1 className='text-1xl font-bold'>Change Password</h1>
                            <p className='text-xm'>Unlock your World</p>
                        </div>
                        <form action="" className='flex flex-col gap-1 '>
                            <label htmlFor="password" className='text-sm'><span className='text-red-500'>*</span> Privious Password</label>
                            <input type="Password" placeholder='Enter Your Privious Password' required className='border  border-gray-300  rounded-md pl-2 pt-1 pb-1 text-xs outline-none' onChange={(e) => SetPriviousPassword(e.target.value)} />

                            <label htmlFor="password" className='text-sm'><span className='text-red-500'>*</span> New Password</label>
                            <input type="Password" placeholder='Enter Your New Password' required className='border  border-gray-300  rounded-md pl-2 pt-1 pb-1 text-xs outline-none' onChange={(e) => SetNewPassword(e.target.value)} />

                            <label htmlFor="password" className='text-sm'><span className='text-red-500'>*</span> Confirm Password</label>
                            <input type="Password" placeholder='Enter Your confirm Password' required className='border  border-gray-300  rounded-md pl-2 pt-1 pb-1 text-xs outline-none ' onChange={(e) => SetConfirmPassword(e.target.value)} />



                        </form>
                        <div className='flex flex-col gap-2 mt-3'>
                            <button className='bg-blue-600 rounded-md text-white py-1 cursor-pointer text-sm' onClick={handleSubmit}>Change Password</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;