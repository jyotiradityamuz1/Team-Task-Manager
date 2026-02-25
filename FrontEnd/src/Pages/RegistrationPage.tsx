import React, { useState } from 'react';
import { requireNoAuth } from '../config/auth';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import bgImage from "../asset/login Background.png"
import { API_ENDPOINTS } from '../config/url';

// Define the props interface
interface RegistrationPageProps {

}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ }) => {
    requireNoAuth();
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [Confirmpassword, SetConfirmPassword] = useState("");

    const checkPassword = () => {
        return Confirmpassword === password;
    }





    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        const next:boolean = checkPassword();
        if (!next) {
           return window.alert("Psssword Not Matched");
        }

        axios.post(API_ENDPOINTS.REGISTER, { userName, email, password, })
            .then((res) => {
                console.log(res)
                navigate('/login');
            })

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
                            <h1 className='text-1xl font-bold'>Creat Account</h1>
                            <p className='text-xm'>Join our Platfrm</p>
                        </div>
                        <form action="" className='flex flex-col gap-1'>
                            <label htmlFor="email" className='text-sm'><span className='text-red-500'>*</span>User Name</label>
                            <input type="text" placeholder='Enter Your Name' required className='border border-gray-300 rounded-md pl-2 pt-1 pb-1 text-xs' onChange={(e) => setUserName(e.target.value)} />

                            <label htmlFor="email" className='text-sm'><span className='text-red-500'>*</span>Email</label>
                            <input type="text" placeholder='Enter Your Email' required className='border border-gray-300 rounded-md pl-2 pt-1 pb-1 text-xs' onChange={(e) => setEmail(e.target.value)} />


                            <label htmlFor="password" className='text-sm'><span className='text-red-500'>*</span>Password</label>
                            <input type="Password" placeholder='Enter Your Password' required className='border  border-gray-300  rounded-md pl-2 pt-1 pb-1 text-xs ' onChange={(e) => SetPassword(e.target.value)} />

                            <label htmlFor="password" className='text-sm'><span className='text-red-500'>*</span>Password</label>
                            <input type="Password" placeholder='Enter Your Password' required className='border  border-gray-300  rounded-md pl-2 pt-1 pb-1 text-xs ' onChange={(e) => SetConfirmPassword(e.target.value)} />

                        </form>
                        <div className='flex flex-col gap-2 mt-3'>
                            <button className='bg-blue-600 rounded-md text-white py-1 cursor-pointer text-sm' onClick={handleRegister}>Register</button>
                            <button className='border border-gray-300 text-gray-700 rounded-md py-1 cursor-pointer text-sm'><Link to="/login">Login</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegistrationPage;