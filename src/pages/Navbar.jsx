import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import simslogo from '../assets/student-management-8-512.png';

export const Navbar = ({ activeItem, setActiveItem }) => {
    const [menuClicked, setMenuClicked] = useState(false);
    const navigate = useNavigate(); 

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="nav flex items-center justify-between bg-[#1b2431] py-3 px-6 fixed top-0 w-full shadow-md z-10">
            <img src={simslogo} alt="Logo" className="h-10 w-10 bg-white rounded-lg border-2 border-black" />
            <div className="relative">
                <ul className={`navbar flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between md:static fixed top-14 right-0 bg-[#1b2431] md:bg-transparent h-full md:h-auto transition-transform duration-300 ease-in-out ${menuClicked ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0`}>
                    {['ho', 'as', 'us', 'rs', 'vs', 'lo'].map((item, index) => {
                        const labels = ['Home', 'Add Student', 'Edit Student', 'Remove Student', 'View Students', 'Log Out'];
                        return (
                            <li
                                key={item}
                                className={`list-none px-6 py-3 text-lg font-semibold cursor-pointer transition-colors duration-200 
                                    ${activeItem === item ? 'text-[#00ffb3] font-bold' : 'text-white hover:text-[#00b3a3] hover:bg-[#2a2e38] rounded-lg'}`} // Updated hover text color
                                onClick={() => {
                                    setActiveItem(item);
                                    setMenuClicked(false);
                                    if (item === 'lo') {
                                        handleLogout();
                                    }
                                }}
                            >
                                {labels[index]}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="mobile md:hidden">
                <i className={`fas ${menuClicked ? 'fa-times' : 'fa-bars'} text-white text-2xl cursor-pointer`} onClick={() => setMenuClicked(prev => !prev)}></i>
            </div>
        </div>
    );
};
