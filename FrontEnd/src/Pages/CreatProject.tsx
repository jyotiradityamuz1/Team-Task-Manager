import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../config/url';
import bgImage from "../asset/login Background.png"
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';

// Define the props interface
interface CreatProjectProps {

}

const CreatProject: React.FC<CreatProjectProps> = ({ }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setsuggestion] = useState<any[]>([]);
    const [ProjectName, setProjectName] = useState("");
    const [ProjectDescription, setProjectDescription] = useState("");
    const [selectedUser, setselectedUser] = useState<any[]>([]);



    const handleSelectUser = (user: any) => {
        const exists = selectedUser.some(u => u._id === user._id);

        if (exists) {
            setselectedUser(selectedUser.filter(u => u._id !== user._id));
        } else {
            setselectedUser([...selectedUser, user]);
        }
        console.log("Selected Users:", selectedUser);
    };

    const handleCreatProject = () => {
        const id = localStorage.getItem("userId");
        const memberIds = selectedUser.map((user) => user._id);
        axios.post(API_ENDPOINTS.CREATE_PROJECT, {
            projectName: ProjectName,
            description: ProjectDescription,
            members: memberIds,
            createdBy:id

        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }

            }).then(() => {
                window.alert("Project Created Successfully");
                window.location.reload();

            }).catch((err) => {
                console.log(err as any);
                const errorMessage = err.response?.data?.message || "An error occurred";
                window.alert(errorMessage);
            })
    }


    useEffect(() => {
        if (searchTerm.trim() === "") {
            setsuggestion([]);
            return;
        }
        axios.get(API_ENDPOINTS.GET_SEARCH_USER, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            params: {
                search: searchTerm
            }
        }).then((res) => {
            setsuggestion(res.data.data);
            console.log(res.data.data);
        }).catch((err) => {
            console.log(err as any);
        });


    }, [searchTerm]);


    return (
        <>

            <div className=' pt-5 pl-10 pr-10 pb-10' style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <div className='p-3 flex rounded-2xl relative  bg-white/25 backdrop-blur-xl shadow-xl border-t border-white/60 border-x-transparent border-b-transparent'>
                    <SideBar />
                    <div>
                        <NavBar />
                        <div className='p-4 border border-gray-400 mt-6 rounded-md w-[70%] ml-[15%] bg-white'>
                            <div className='flex flex-col gap-1 mb-4'>
                                <h1 className='font-bold'>Creat Project</h1>
                                <p className='text-xs'>Creat A New Project Together</p>
                            </div>
                            <form action="" className='flex flex-col gap-1'>
                                <label htmlFor="projectName" className='text-sm'><span className='text-red-500'>*</span>Project Name</label>
                                <input type="text" id="projectName" placeholder='Enter Your Project Name' required className='border border-gray-300 rounded-md pl-2 pt-1 pb-1 text-xs outline-none' onChange={(e) => setProjectName(e.target.value)} />

                                <label htmlFor="ProjectDescription" className='text-sm'><span className='text-red-500'>*</span>Project Description</label>
                                <input type="text" id="ProjectDescription" placeholder='Enter Your Project Description' required className='border border-gray-300 rounded-md pl-2 pt-1 pb-1 text-xs outline-none' onChange={(e) => setProjectDescription(e.target.value)} />

                                <label htmlFor="" className='text-sm'><span className='text-red-500'>*</span>Select Members</label>
                                <input type="" placeholder='Search for Members......' value={searchTerm} className='border  border-gray-300  rounded-md pl-2 pt-1 pb-1 text-xs outline-none' onChange={(e) => setSearchTerm(e.target.value)} />
                            </form>
                            <div>
                                {suggestions.length > 0 && (
                                    <ul className='border border-gray-300 mt-2 max-h-40 overflow-y-auto'>
                                        {suggestions.map((suggestion: any) => (
                                            <div className='flex p-2'>
                                                <input type="checkbox" id={suggestion.email} value={suggestion.userName} checked={selectedUser.some(u => u._id === suggestion._id)} onChange={() => { handleSelectUser(suggestion) }} />
                                                <label htmlFor={suggestion.email} className='p-2 hover:bg-gray-200 cursor-pointer text-sm'>
                                                    {suggestion.userName}    -   {suggestion.email}
                                                </label>
                                            </div>
                                        ))}
                                    </ul>
                                )}
                                <div className="mt-3 w-[65%] flex p-2 rounded-md flex-col">
                                    {selectedUser.length === 0 ?
                                        <span className='text-sm'><span className='text-red-600'>*</span> No Members Selected yet</span>
                                        : selectedUser.length > 0 &&
                                        <span className='text-sm'>Selected Members:</span>

                                    }

                                    {selectedUser && selectedUser.map((user, index) => (

                                        <span key={user._id} className='text-sm'><span className='text-md'>{index + 1}. </span>{user.userName}</span>

                                    ))}
                                </div>


                            </div>
                            <div className='mx-10 flex justify-between  mt-5 gap-2'>

                                <button className='border border-gray-300 text-gray-700 rounded-md py-1 cursor-pointer text-sm w-full'>cancle</button>
                                <button className='bg-blue-600 rounded-md text-white py-1 cursor-pointer text-sm w-full' onClick={handleCreatProject}>Creat Project</button>

                            </div>


                        </div>
                    </div>
                </div>


            </div >
        </>
    );
};

export default CreatProject;