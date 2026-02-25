import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../config/url';
import { FaUser } from 'react-icons/fa';
import { logOut } from '../config/auth';

// Define the props interface
interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({ }) => {


    const [User, setUser] = useState([]);


    useEffect(() => {

        axios.get(API_ENDPOINTS.GET_USER,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then((response) => {


                setUser(response.data.data);
                console.log(response.data.data)
                console.log((response.data.data).userName);


            }).catch((error) => {
                console.log(error);

            })

    }, []);


    return (
        <div>
            <div className='ml-1  pl-2 pr-2 pb-2  w-full'>
                <div className=' flex justify-between p-2 gap-70' >
                    <span className='font-bold opacity-70'>Dashboard</span>
                    <div className='flex gap-3 align-center items-center'>
                        <div className="bg-white p-2 rounded-full text-indigo-500"> <FaUser size={20} /></div>
                        <h3 >{(User as any)?.userName}</h3>
                        <button className='border border-gray-200 rounded-md bg-white text-blue-400 p-1 text-xs' onClick={logOut}>Logout</button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default NavBar;