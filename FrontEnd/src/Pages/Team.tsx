import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import bgImage from "../asset/login Background.png"
import NavBar from '../components/NavBar';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/url';
import { requireAuth } from '../config/auth';





// Define the props interface
interface TeamProps {

}




const Team: React.FC<TeamProps> = ({ }) => {
    requireAuth();
    const [ProjectByUser, setProjectByUser] = useState([]);
    const [SelecetedProject, setSelecetedProject] = useState<any>({ members: [] });
    const [ProjectId, setProjectId] = useState("");
    const [isActivated, setIsActivated] = useState(false);
    const [isActivated2, setIsActivated2] = useState(false);

    const [condition, setCondition] = useState(false);

    const [AssignTo, setAssignTo] = useState("");

    const [selectedUser, setselectedUser] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setsuggestion] = useState<any[]>([]);
    const [createdBy, setCreatedBy] = useState(false);


    const handleSelectUser = (user: any) => {
        const exists = selectedUser.some(u => u._id === user._id);

        if (exists) {
            setselectedUser(selectedUser.filter(u => u._id !== user._id));
        } else {
            setselectedUser([...selectedUser, user]);
        }
        console.log("Selected Users:", selectedUser);
    };





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










    useEffect(() => {
        axios.post(API_ENDPOINTS.GET_USER_PROJECT, {
            UserId: localStorage.getItem("userId")
        },
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                setProjectByUser(res.data.projects);
                console.log(res.data.projects);
                setCreatedBy(false);

            }).catch((err) => {
                console.log(err as any);
            })
    }, []);


    useEffect(() => {
        console.log("Selected ProjectId:", ProjectId);
        console.log(typeof SelecetedProject)
    }, [ProjectId]);




    useEffect(() => {
        console.log("Selected ProjectId22:", ProjectId);
        if (!ProjectId) return;
        console.log(ProjectId);
        axios.get(API_ENDPOINTS.PROJECT_MEMBERS, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            params: {
                ProjectID: ProjectId
            }
        }).then((res) => {
            setSelecetedProject(res.data.projectDetails);
            setCreatedBy(false)

        }).catch((err) => {
            console.log(err as any);
        });

    }, [ProjectId]);


    const deleteMemberFromProject = () => {
        console.log(AssignTo);

        axios.put(API_ENDPOINTS.DELETE_MEMBER_FROM_PROJECT, {
            projectId: ProjectId,
            userId: AssignTo
        },
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                console.log(res.data.updatedProject);
                setSelecetedProject(res.data.updatedProject);
                setAssignTo("");
                setIsActivated(false);

                window.alert("Member Deleted Succefully");
            }).catch((err) => {
                console.log(err);
            })
    }



    const AddMemberToProject = () => {
        const memberIds = selectedUser.map((user) => user._id);
        axios.put(API_ENDPOINTS.ADD_MEMBER_TO_PROJECT, {
            members: memberIds,
            projectId: ProjectId,
        },
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                setSelecetedProject(res.data.project); // 🔥 KEY LINE
                setselectedUser([]);
                setSearchTerm("");
                setsuggestion([]);
                setIsActivated2(false);
                window.alert("Member ADDED");
            }).catch((err) => {
                console.log(err);
            })
    }







    const HandleRemoveMember = () => {
        setIsActivated(true);
        if (condition === true) {
            setCondition(false);
            setIsActivated(false);
            return;
        }
        setCondition(true);

    }
    const HandleADDMember = () => {
        setIsActivated2(true);
        if (condition === true) {
            setCondition(false);
            setIsActivated2(false);
            return;
        }
        setCondition(true);

    }

    useEffect(() => {
        const CreatedBY = SelecetedProject?.createdBy;
        const userID = localStorage.getItem("userId");
        if (CreatedBY === userID) {
            
            setCreatedBy(true);
        }
        console.log(setCreatedBy);
        



    }, [SelecetedProject]);

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
                        <div className='flex flex-col gap-3'>
                            <select value={ProjectId} className='border border-gray-400 rounded-md w-full outline-none text-center' onChange={(e) => setProjectId(e.target.value)}>
                                <option value="null">----Select----</option>
                                {ProjectByUser && ProjectByUser.map((user: any, index: any) => (
                                    <option key={index} value={user._id}>{user.projectName}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }} className='border border-gray-300 rounded-2xl p-2 my-2'>
                            {
                                ProjectId ?
                                    <>
                                        <div className='flex justify-center'>
                                            <h1 className=" uppercase py-1 px-3 cursor-pointer text-sm p-3  mt-1 pb-5">{SelecetedProject.projectName}</h1>
                                        </div>
                                        <table className=' mt-2  border-collapse w-full'>
                                            <tr className='border-b border-gray-200  '>
                                                <th className='text-md p-2 font-extralight text-gray-500 text-left'>NAME</th>
                                                <th className='text-md p-2 font-extralight text-gray-500  text-left'>Email</th>
                                            </tr>
                                            {SelecetedProject && SelecetedProject?.members?.map((members: any) => (
                                                <tr className='border-b border-gray-100 last:border-b-0'>
                                                    <td className=' p-2'>{members.userName}</td>
                                                    <td className=' p-2'>{members.email}</td>
                                                </tr>
                                            ))}
                                        </table>

                                        {createdBy&&
                                            <div className='flex justify-around mb-2'>

                                                <button className="bg-blue-600 rounded-md text-white py-1 px-3 cursor-pointer text-sm p-3  mt-3" onClick={HandleADDMember}>Add member</button>

                                                <button className="bg-blue-600 rounded-md text-white py-1 px-3 cursor-pointer text-sm p-3  mt-3" onClick={HandleRemoveMember}>Remove member</button>
                                            </div>
                                        }
                                        {isActivated &&
                                            <>
                                                <div className='flex flex-col gap-2 items-center border mx-30 mt-5 border-gray-300 p-5 rounded-2xl '>
                                                    <select
                                                        value={AssignTo}
                                                        className="border border-gray-400 rounded-md w-full"
                                                        onChange={(e) => setAssignTo(e.target.value)}
                                                    >
                                                        <option value="">----Select----</option>
                                                        {SelecetedProject.members.map((user: any) => (
                                                            <option key={user._id} value={user._id}>
                                                                {user.userName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button className="bg-blue-600 rounded-md text-white py-1 px-3 cursor-pointer text-sm p-3  mt-3" onClick={deleteMemberFromProject}>delete member</button>
                                                </div>

                                            </>
                                        }
                                        {isActivated2 &&
                                            <>
                                                <div className='flex gap-2 flex-col ml-50'>
                                                    <label htmlFor="" className='text-sm'><span className='text-red-500'>*</span>Select Members</label>
                                                    <input type="" placeholder='Search for Members......' value={searchTerm} className='border  border-gray-300  rounded-md pl-2 pt-1 pb-1 text-xs outline-none w-50 bg-white' onChange={(e) => setSearchTerm(e.target.value)} />
                                                </div>
                                                <div className='ml-50'>
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

                                                <button className="bg-blue-600 ml-63 rounded-md text-white py-1 px-3 cursor-pointer text-sm p-3  mt-3" onClick={AddMemberToProject}>Add member</button>

                                            </>
                                        }

                                    </>
                                    :
                                    <div>
                                        <h1 className='mt-5 text-center'>
                                            Please Select your Project First😒😒😒😒⬆️⬆️⬆️⬆️⬆️
                                        </h1>
                                    </div>

                            }
                        </div>
                    </div>
                </div>

            </div>


        </>
    );
};

export default Team;