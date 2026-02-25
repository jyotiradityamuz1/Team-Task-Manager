import React, { useEffect, useState } from 'react';
import bgImage from "../asset/login Background.png";
import { requireAuth } from '../config/auth';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import axios from 'axios';
import blue from "../asset/blue.png"
import profile from '../asset/profile.jpg'

// Define the props interface
interface SettingPageProps {

}

const SettingPage: React.FC<SettingPageProps> = ({ }) => {
    requireAuth();
    const [User , setUser] = useState<any>(null);
    useEffect(()=>{
        const UserHAI = localStorage.getItem('user');
        console.log(UserHAI);
        if (UserHAI) {
            setUser(JSON.parse(UserHAI));
        }
    },[]);

    return (
        <div className=' pt-5 pl-10 pr-10 pb-10' style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <div className="flex h-screen rounded-2xl bg-white/25 backdrop-blur-xl shadow-xl border-t border-white/60">
                <SideBar />
                <div className="flex flex-col flex-1 p-3">
                    <NavBar />
                    <div className='flex flex-col items-center'>
                        <div className=' rounded-2xl border border-white mx-10 p-3 w-[50%] flex flex-col gap-2 items-center ' style={{
                                backgroundImage: `url(${blue})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}>
                            <img src={profile} alt="profilr image" className='w-25 h-25 border border-gray-100 rounded-full p-1 bg-yellow-50'/>
                            {User && (
                            <>
                            <h2 className='border border-gray-300 p-2 w-[50%] text-center rounded-2xl text-white'>{(User as any)?.userName}</h2>
                            <h2 className='border border-gray-300 p-2  text-center rounded-2xl text-white'>{(User as any)?.email}</h2>
                            </>
                            )}
                        </div>
                        <>
                          <button className="bg-blue-600 rounded-md text-white py-1 px-3 cursor-pointer text-sm p-3  mt-3">
                            <Link to="/change-password">Change Password</Link>
                        </button>
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;