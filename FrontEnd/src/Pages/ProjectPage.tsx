import React, { useEffect, useState } from 'react';
import bgImage from "../asset/login Background.png";
import { requireAuth } from '../config/auth';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/url';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';



// Define the props interface
interface ProjectPageProps { }

const ProjectPage: React.FC<ProjectPageProps> = ({ }) => {
    requireAuth();

    const [User, setUser] = useState([]);
    const [ProjectByUser, setProjectByUser] = useState([]);
    const [Task, setTask] = useState("");
    const [AssignBy, setAssignBy] = useState("");
    const [AssignTo, setAssignTo] = useState("");
    const [CompeletedProject, setCompeletedProject] = useState([]);
    const [isActivated, setIsActivated] = useState(Boolean);
    const [UserId, setUserID] = useState("");

    const handleAddTask = (ProjectByUser: any) => {
        axios.post(API_ENDPOINTS.CREAT_TASK, {
            title: Task,
            assignedBy: AssignBy,
            assignedToUserId: AssignTo,
            projectId: ProjectByUser,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then(() => {
                window.alert("Task Added Successfully");
                window.location.reload();
            }).catch((err) => {
                console.log(err as any);
                const errorMessage = err.response?.data?.message || "An error occurred";
                window.alert(errorMessage);
            });
    };

    useEffect(() => {
        const userID = localStorage.getItem("userId");
        setUserID(userID || "");
        axios.post(API_ENDPOINTS.GET_USER_PROJECT, {
            UserId: (User as any)?._id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                setProjectByUser(res.data.projects);
                setIsActivated(false);
            }).catch(console.log);
    }, [User]);


    const handleProjectStatus = (projectID: any) => {
        axios.post(API_ENDPOINTS.PROJECT_STATUS, {
            projectId: projectID
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then(() => {
                window.alert("Project Status updated to compeleted Sucessfully");
                window.location.reload();
            }).catch((err) => {
                console.log(err);

            });
    }

    const handleCompeletedProject = () => {
        axios.get(API_ENDPOINTS.COMPELET_PROJECT,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then((response) => {
                setCompeletedProject(response.data.projects);
                console.log(response.data.projects);
                setIsActivated(true);

            }).catch((err) => {
                console.log(err);

            });
    }




    useEffect(() => {
        axios.get(API_ENDPOINTS.GET_USER, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            setUser(response.data.data);
            setAssignBy((response.data.data)._id);
        }).catch(console.log);
    }, []);



    return (
        <>
            {
                <div
                    className="h-screen overflow-hidden p-5"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >

                    <div className="flex h-full rounded-2xl bg-white/25 backdrop-blur-xl shadow-xl border-t border-white/60">


                        <SideBar />


                        <div className="flex flex-col flex-1 p-3">


                            <NavBar />
                            <div className='flex gap-50 mt-1'>
                                <button className="bg-blue-600 rounded-md text-white py-2 cursor-pointer text-sm px-3 w-[30%]">
                                    <Link to="/create-project">Create New Project</Link>
                                </button>
                                <button className="bg-green-600 rounded-md text-white py-2 cursor-pointer text-sm px-3 w-[30%]" onClick={handleCompeletedProject}>
                                    Compeleted Project
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto mt-1 pr-4">
                                {ProjectByUser &&
                                    <>
                                        {isActivated && isActivated ?

                                            <div className="mt-6 flex flex-col gap-5">
                                                {CompeletedProject.map((project: any) => (
                                                    <div key={project._id} className="border border-gray-300 rounded-2xl p-4 bg-white"
                                                        style={{
                                                            backgroundImage: `url(${bgImage})`,
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                        }} >
                                                        <div className="flex items-center">

                                                            <div className="w-[60%]">
                                                                <h2 className="font-bold text-lg mb-2 uppercase">
                                                                    {project.projectName}
                                                                </h2>
                                                                <p className="text-sm mb-4">
                                                                    {project.description}
                                                                </p>

                                                                <h3 className="font-semibold text-sm mb-1">
                                                                    Members:
                                                                </h3>
                                                                <ul className="list-disc list-inside text-sm">
                                                                    {project?.members?.map((member: any) => (
                                                                        <li key={member._id}>
                                                                            {member?.userName} - {member?.email}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div> :
                                            <>


                                                {ProjectByUser.length > 0 ? (
                                                    <div className="flex flex-col">



                                                        <div className="mt-6 flex flex-col gap-5">
                                                            {ProjectByUser.map((project: any) => (
                                                                <div key={project._id} className="border border-gray-300 rounded-2xl p-4 bg-white"
                                                                    style={{
                                                                        backgroundImage: `url(${bgImage})`,
                                                                        backgroundSize: "cover",
                                                                        backgroundPosition: "center",
                                                                    }} >
                                                                    <div className="flex">

                                                                        <div className="w-[60%]">
                                                                            <h2 className="font-bold text-lg mb-2 uppercase">
                                                                                {project.projectName}
                                                                            </h2>
                                                                            <p className="text-sm mb-4">
                                                                                {project.description}
                                                                            </p>

                                                                            <h3 className="font-semibold text-sm mb-1">
                                                                                Members:
                                                                            </h3>
                                                                            <ul className="list-disc list-inside text-sm">
                                                                                {project.members.map((member: any) => (
                                                                                    <li key={member._id}>
                                                                                        {member.userName} - {member.email}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                            {(UserId=== project.createdBy) &&
                                                                                <div className='mt-5 flex gap-2 '>
                                                                                    <input type="checkBox" id="hihihi" className=' peer h-4 w-4 border-gray-300 rounded text-green-500 focus:ring-green-500' onChange={() => { handleProjectStatus(project._id) }} />
                                                                                    <label htmlFor="hihihi" className='text-sm cursor-pointer peer-checked:text-green-600'>Mark this Project as Compeleted</label>
                                                                                </div>
                                                                            }
                                                                        </div>

                                                                        <div className="border border-gray-300 w-[33%] rounded-2xl p-4 ml-4 bg-gray-50" style={{
                                                                            backgroundImage: `url(${bgImage})`,
                                                                            backgroundSize: "cover",
                                                                            backgroundPosition: "center",
                                                                        }}>
                                                                            <div className="w-40 p-1 flex flex-col">
                                                                                <h2 className="font-medium pl-2">
                                                                                    Assign Task
                                                                                </h2>

                                                                                <input
                                                                                    type="text"
                                                                                    placeholder="New Task"
                                                                                    className="border border-gray-300 bg-white rounded-md pl-2 pt-1 pb-1 text-xs outline-none mt-2"
                                                                                    onChange={(e) => setTask(e.target.value)}
                                                                                />

                                                                                <hr className="mt-5 mb-3 text-gray-300" />

                                                                                <h3 className="text-gray-500 mb-1">
                                                                                    Assign To
                                                                                </h3>

                                                                                <select
                                                                                    value={AssignTo}
                                                                                    className="border border-gray-400 rounded-md w-full"
                                                                                    onChange={(e) => setAssignTo(e.target.value)}
                                                                                >
                                                                                    <option value="">----Select----</option>
                                                                                    {project.members.map((user: any) => (
                                                                                        <option key={user._id} value={user._id}>
                                                                                            {user.userName}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>

                                                                                <button
                                                                                    className="bg-blue-600 rounded-md text-white py-1 px-3 cursor-pointer text-sm w-full mt-3"
                                                                                    onClick={() => handleAddTask(project._id)}
                                                                                >
                                                                                    ADD Task
                                                                                </button>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) :
                                                    (
                                                        <div className="flex flex-col items-center justify-center mt-20">
                                                            <h2 className="text-gray-600 font-semibold text-lg">
                                                                No Projects Found
                                                            </h2>
                                                            <button className="bg-blue-600 rounded-md text-white py-1 cursor-pointer text-sm p-3 w-[20%] mt-3">
                                                                <Link to="/create-project">Create New Project</Link>
                                                            </button>
                                                        </div>
                                                    )}
                                            </>
                                        }
                                    </>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ProjectPage;
