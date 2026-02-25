import React, { useEffect, useState } from 'react';
import bgImage from "../asset/login Background.png"
import blue from "../asset/blue.png"
import green from "../asset/green.png"
import yellow from "../asset/yellow.png"
import { FaClipboardList, FaCheckCircle, FaClock, FaUser, } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { SiGoogletagmanager } from "react-icons/si";
import { logOut, requireAuth } from '../config/auth';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/url';
import { NavLink } from 'react-router-dom';


// interface UserData {
// email: String;
// password: String;
// updatedAt: String;
// userName: String;
// }

interface DashBoardProps {

}

const DashBoard: React.FC<DashBoardProps> = ({ }) => {
    requireAuth();
    const [User, setUser] = useState(null);
    const [UserId, setUserId] = useState("");

    const [YourTask, setYourTask] = useState([]);




    const [p, setP] = useState(0);
    const [c, setC] = useState(0);


    useEffect(() => {

        axios.get(API_ENDPOINTS.GET_USER,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                params: {
                    objectId: localStorage.getItem("objectId")
                }
            }).then((response) => {


                setUser(response.data.data);
                console.log(response.data.data)
                console.log((response.data.data).userName);
                setUserId((response.data.data)._id);



            }).catch((error) => {
                console.log(error);

            })

    }, []);
    useEffect(() => {
        console.log("Khoj rahe hai sare user ko");
        const userID = localStorage.getItem("userId");

        axios.get(API_ENDPOINTS.GET_YOUR_TASK,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                params: {
                    objectId: userID
                }
            }).then((response) => {

                setYourTask(response.data.tasks);
                console.log(response.data.data);


            }).catch((error) => {
                console.log(error);

            })

    }, []);


    useEffect(() => {
        let pendingCount = 0;
        YourTask.forEach((task: any) => {
            if (task.status === 'in-progress') {
                pendingCount++;
            }
        });
        setP(pendingCount);
    }, [YourTask]);


    useEffect(() => {
        let CompeletedCount = 0;
        YourTask.forEach((task: any) => {
            if (task.status === 'done') {
                CompeletedCount++;
            }
        });
        setC(CompeletedCount);
    },[YourTask]);


    const handleStatus = (TaskId: any, status: any) => {




        axios.put(API_ENDPOINTS.EDIT_STATUS, {
            status: status
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                params: {
                    taskId: TaskId
                }
            }).then(() => {
                window.location.reload();
            }).catch((err) => {
                console.log(err as any);
                const errorMessage = err.response?.data?.message || "An error occurred";
                window.alert(errorMessage);
            })



    };

    return (
        <>
            <div className=' pt-5 pl-10 pr-10 pb-10' style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat:"no-repeat",
                backgroundAttachment:"fixed",
                margin:0,
            }}>

                <div className='p-3 flex rounded-2xl relative  bg-white/25 backdrop-blur-xl shadow-xl border-t border-white/60 border-x-transparent border-b-transparent'>
                    <div className='  p-5 pt-2 ' >
                        <div className='flex gap-1 '><SiGoogletagmanager size={20} /><h3 className='text-gray-600'>TaskManager</h3></div>
                        <div>
                            <ul className='flex flex-col gap-3 mt-3'>
                                <NavLink to="/" className={({ isActive }) =>
                                    `text-sm flex gap-2 items-center cursor-pointer p-2 rounded-md
                                        ${isActive
                                        ? "bg-blue-500 text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-400 hover:text-white"}`
                                } >
                                    <MdDashboardCustomize size={15} />
                                    Dashboard</NavLink>
                                <NavLink to="/project" className={({ isActive }) =>
                                    `text-sm flex gap-2 items-center cursor-pointer p-2 rounded-md
                                    ${isActive
                                        ? "bg-blue-500 text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-400 hover:text-white"}`
                                }> <BiTask size={15} />Project</NavLink>
                                <NavLink to="/team  " className={({ isActive }) =>
                                    `text-sm flex gap-2 items-center cursor-pointer p-2 rounded-md
                                    ${isActive
                                        ? "bg-blue-500 text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-400 hover:text-white"}`
                                }><RiTeamFill size={15} />Team</NavLink>
                                <NavLink to="/setting" className={({ isActive }) =>
                                    `text-sm flex gap-2 items-center cursor-pointer p-2 rounded-md
                                    ${isActive
                                        ? "bg-blue-500 text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-400 hover:text-white"}`
                                }> <IoSettingsOutline size={15} />Setting</NavLink>
                            </ul>
                        </div>
                    </div>
                    <div className='ml-1  pl-2 pr-2 pb-2'>
                        <div className=' flex justify-between p-2' >
                            <span className='font-bold opacity-70'>Dashboard</span>
                            <div className='flex gap-2 align-center items-center'>
                                <div className="bg-white p-2 rounded-full text-indigo-500"> <FaUser size={20} /></div>
                                <h3>{(User as any)?.userName}</h3>
                                <button className='border border-gray-200 rounded-md bg-white text-blue-400 p-1 text-xs' onClick={logOut}>Logout</button>
                            </div>
                        </div>
                        <div className=' flex p-2 gap-5'>
                            <div className='flex items-center  justify-between gap-3 p-6 rounded-2xl bg-linear-to-br text-white shadow-lg w-45 h-25' style={{
                                backgroundImage: `url(${blue})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}>
                                <div className="bg-white p-3 rounded-full text-blue-500"><FaClipboardList size={26} /></div>
                                <div>
                                    <h5 className='text-sm font-bold'>Total Tasks</h5>
                                    <h2 className='text-lr'>{YourTask?.length}</h2>
                                </div>
                            </div>
                            <div className='flex items-center justify-between p-6 gap-3 rounded-2xl  text-white shadow-lg w-45 h-25' style={{
                                backgroundImage: `url(${green})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }} >
                                <div className="bg-white p-3 rounded-full text-green-500"><FaCheckCircle size={26} /></div>
                                <div>
                                    <h5 className='text-sm font-bold'>completed Tasks</h5>
                                    <h2 className='text-lr'>{c}</h2>
                                </div>
                            </div>
                            <div className='flex items-center justify-between p-6 gap-3 rounded-2xl bg-linear-to-br text-white shadow-lg w-45 h-25' style={{
                                backgroundImage: `url(${yellow})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }} >
                                <div className="bg-white p-3 rounded-full text-yellow-500"><FaClock size={26} /></div>
                                <div>

                                    <h5 className='text-sm font-bold'>Pending Tasks</h5>
                                    <h2 className='text-'>{p}</h2>
                                </div>
                            </div>
                        </div>


                        <div className=' mt-2 flex pl-2 pr-2 pt-2 pb-2 gap-10' >
                            {YourTask && 
                                <div className='p-3 rounded-2xl w-full bg-white shadow-md'>

                                    <div className='pl-2'>
                                        <h2 className='font-medium'>Your Tasks</h2>
                                    </div>
                                    {YourTask.length > 0 ?
                                        <table className='border border-gray-300 mt-2  border-collapse w-full'>
                                            <tr className='border-b border-gray-200  '>
                                                <th className='text-md p-2 font-extralight text-gray-500 text-left'>Task</th>
                                                <th className='text-md p-2 font-extralight text-gray-500  text-left'>Assigned By</th>
                                                <th className='text-md p-2 font-extralight text-gray-500  text-left'>Project</th>
                                                <th className='text-md p-2 font-extralight text-gray-500  text-left'>Status</th>
                                            </tr>
                                            {YourTask && YourTask.map((task: any) => (
                                                <tr className='border-b border-gray-100 last:border-b-0'>
                                                    <td className=' p-2'>{task.title}</td>
                                                    <td className=' p-2'>{task.assignedBy?.userName || []}</td>
                                                    <td className=' p-2'>{task.project?.projectName || []}</td>
                                                    <td className=' p-2  '><span className={`${task.status === "done" ? "bg-green-500" : task.status === "in-progress" ? "bg-blue-500" : "bg-gray-400"} rounded-md text-white py-1 px-3 cursor-pointer text-center text-sm`} onClick={() => { handleStatus(task._id as any, task.status) }}>{task.status}</span></td>
                                                </tr>
                                            ))}

                                        </table> :
                                        <div>
                                            <h3>No task to display</h3>
                                        </div>
                                    }
                                </div>
                            }

                        </div>
                    </div>
                </div>



            </div >

        </>
    );
};

export default DashBoard;