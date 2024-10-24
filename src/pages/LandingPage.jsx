import { useState, useEffect ,useContext, createContext} from 'react';
import { Navbar } from './Navbar';
import { AddStudent } from './AddStudent';
import { ViewStudents } from './ViewStudents';
import { Home } from './Home';
import api from '../api/info';
import { AppContext } from '../App';

export const navStudentContext = createContext(); 

export const LandingPage = () => {
  const { activeItem, setActiveItem } = useContext(AppContext);
  const [students, setStudents] = useState([]);

  // Fetch initial student data from JSON Server
  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      const data = response.data;
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  useEffect(() => {
    fetchStudents(); // Fetch students on initial load
  }, []);

  // Function to add a new student
  const addStudent = async () => {
    try {
      fetchStudents(); // Refetch students after adding a new one
    } catch (error) {
      console.error('Failed to add student:', error);
    }
  };

  return (
    <navStudentContext.Provider value={{ students,addStudent,activeItem, setActiveItem}}>
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center">
      <Navbar/>
      <div className="w-full mt-16">
        {
          activeItem === 'ho' ? <Home /> :
          activeItem === 'as' ? <AddStudent/> :
          activeItem === 'vs' ? <ViewStudents/> :
          null 
        }
      </div>
    </div>
    </navStudentContext.Provider>
  );
};
