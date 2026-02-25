import React, { useEffect, useState } from 'react';
import bgImage from "../asset/login Background.png"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/url';
// Define the props interface
interface ForgetPasswordProps {

}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ }) => {
    const navigate = useNavigate();
    const [isActive, setIsActivated] = useState(Boolean);
    const [email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");
    const [BackendOTP, setBackEndOTP] = useState("");
    const [passwordSection, setPasswordSection] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [min ,setMin]=useState(1);
    const [sec ,setSec]=useState(59);


    
    useEffect(()=>{
        const interval = setInterval(() => {
        if(sec>0)
        {
            setSec(sec-1);
        }
        if(sec === 0)
        {
            if(min === 0)
            {
                clearInterval(interval);
            }
            else{
                setSec(59);
                setMin(min-1);
            }
        }
            
    }, 1000);
    return ()=>{
        clearInterval(interval);
    }
        
    },[sec])

    const generateOTP = () => {
        setIsActivated(true);
        axios.post(API_ENDPOINTS.GET_OTP,
            {
                email: email
            }
        ).then((res) => {
            setBackEndOTP((res.data.otp)as string);
            console.log(res.data.otp);

            setIsActivated(true);
        })
    }


    const SubmitOTP = () => {
        window.alert("aagaye iske andarg")
        console.log(typeof BackendOTP,typeof OTP);
        
        if (BackendOTP === OTP) {
            window.alert("OTP Mached ,You Can Change Your Password");
            setPasswordSection(true);
        }
    }




    const creatPassword = () => {
        if(newPassword !== confirmPassword)
        {
            return window.alert("Make sure that both the password is same");
        }
       axios.post(API_ENDPOINTS.CREATE_PASSWORD,{
        email:email,
        newPassword:newPassword
       }).then((res)=>{
        console.log(res.data.AfterUpdate);
        
            window.alert("Password Change Successfully You can Login With the new Password");
            navigate('/Login');
       }).catch((error)=>{
        console.log(error);
        
       })
    }





    return (
        <>
            <div className='h-screen m-auto flex justify-center items-center ' style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <>{passwordSection && passwordSection ?
                    <div>
                        <form action="" className='flex flex-col gap-1'>
                            <label htmlFor="email" className='text-sm'><span className='text-red-500'>*</span> New-Password</label>
                            <input type="text" placeholder='Enter New Password' required className='border border-gray-300 rounded-md pl-2 pt-1 pb-1 text-xs' onChange={(e) => { setNewPassword(e.target.value) }} />
                             <label htmlFor="email" className='text-sm'><span className='text-red-500'>*</span> Confirm-Password</label>
                            <input type="text" placeholder='Enter the same Password' required className='border border-gray-300 rounded-md pl-2 pt-1 pb-1 text-xs' onChange={(e) => { setConfirmPassword(e.target.value) }} />

                        </form>
                        <div className='flex flex-col gap-2 mt-3'>
                            <button className='bg-blue-600 rounded-md text-white py-1 cursor-pointer text-sm' onClick={creatPassword}>Create New Password</button>

                        </div>

                    </div> :


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
                                <h1 className='text-1xl font-bold'>Forget Your Password</h1>
                                <p className='text-xm'>Unlock your World</p>
                            </div>
                            {isActive && isActive ?
                                <div>
                                    <form action="" className='flex flex-col gap-1'>
                                        <label htmlFor="email" className='text-sm'><span className='text-red-500'>*</span> Verify OTP</label>
                                        <input type="text" placeholder='Enter the OTP' required className='border border-gray-300 rounded-md pl-2 pt-1 pb-1 text-xs' onChange={(e) => { setOTP(e.target.value) }} />

                                    </form>
                                    <div className='flex gap-5 mt-2'>
                                        <p className='text-xs'>Time Remaninig :<span>{min<10?`0${min}`:min}:{sec<10 ? `0${sec}`:sec}</span></p>
                                        <p className='text-blue-400 decoration-lime-50 text-xs  underline underline-offset-6 hover:cursor-pointer '>Resend OTP</p>
                                    </div>
                                    <div className='flex flex-col gap-2 mt-3'>
                                        <button className='bg-blue-600 rounded-md text-white py-1 cursor-pointer text-sm' onClick={SubmitOTP}>Submit OTP</button>

                                    </div>
                                </div> :
                                <>
                                    <form action="" className='flex flex-col gap-1'>
                                        <label htmlFor="email" className='text-sm'><span className='text-red-500'>*</span>Email</label>
                                        <input type="text" placeholder='Enter Your Email' required className='border border-gray-300 rounded-md pl-2 pt-1 pb-1 text-xs' onChange={(e) => { setEmail(e.target.value) }} />

                                    </form>
                                    <div className='flex flex-col gap-2 mt-3'>
                                        <button className='bg-blue-600 rounded-md text-white py-1 cursor-pointer text-sm' onClick={generateOTP}>Generate OTP</button>

                                    </div>
                                </>
                            }
                            <div className="flex gap-3 justify-center items-center my-1">
                                <a className='text-xs text-blue-400'><Link to='/login'>Log In</Link></a>
                            </div>
                        </div>

                    </div>
                }
                </>
            </div>
        </>
    );
};

export default ForgetPassword;