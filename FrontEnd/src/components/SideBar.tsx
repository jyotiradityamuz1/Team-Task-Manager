
import { BiTask } from 'react-icons/bi';

import { IoSettingsOutline } from 'react-icons/io5';
import { MdDashboardCustomize } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { SiGoogletagmanager } from 'react-icons/si';
import { NavLink } from 'react-router-dom';




interface SideBarProps {

}

const SideBar: React.FC<SideBarProps> = ({ }) => {

    return (
   <>

            
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
                            <NavLink to="/team" className={({ isActive }) =>
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
            
           
            </>
            );
};

            export default SideBar;