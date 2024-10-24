import { useEffect, useState } from 'react';
import api from '../api/info';
import { departments } from './departments'; // Ensure correct path
import { FaUserGraduate } from 'react-icons/fa';
import { RiComputerLine, RiBatteryChargeLine, RiToolsLine } from 'react-icons/ri';
import { MdConstruction, MdOutlineArchitecture } from 'react-icons/md'; // Architecture for Civil
import { SiPython, SiPostgresql } from 'react-icons/si'; // Icons for IT and other departments
import { GiArtificialIntelligence, GiBrain, GiRobotGolem, GiLockedFortress } from 'react-icons/gi'; // Icons for AI, Chemical, CSBS, MCT, and CSE(CY)

export const Home = () => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [departmentCounts, setDepartmentCounts] = useState({});
  const [yearCounts, setYearCounts] = useState({}); // State for year-wise counts
  const [recentStudent, setRecentStudent] = useState(null); // State for the recent student

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/students'); // Adjust API call
        if (Array.isArray(response.data)) {
          setStudents(response.data);
          setTotalStudents(response.data.length);

          // Initialize department counts
          const deptCounts = departments.reduce((acc, { value }) => {
            acc[value] = 0;
            return acc;
          }, {});

          // Initialize year counts
          const yrCounts = { 1: 0, 2: 0, 3: 0, 4: 0};

          response.data.forEach(student => {
            const dept = student.department || '';
            if (deptCounts.hasOwnProperty(dept)) {
              deptCounts[dept] += 1;
            }

            // Count students by year of study
            const year = student.yearOfStudy || 'Unknown';
            if (yrCounts[year]) {
              yrCounts[year] += 1;
            } else {
              yrCounts[year] = 1;
            }
          });

          setDepartmentCounts(deptCounts);
          setYearCounts(yrCounts); // Set year counts

          // Set the recent student to the last student in the array
          if (response.data.length > 0) {
            setRecentStudent(response.data[response.data.length - 1]);
          }
        } else {
          console.error('Students data is not in the expected format:', response.data);
          setTotalStudents(0);
          setDepartmentCounts({});
          setYearCounts({});
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="relative w-full text-black p-6 bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600">Student Information Analysis</h1>
        <p className="text-md md:text-lg mt-1 text-gray-700">Analyze student distribution across departments</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">Total Students</h2>
          <p className="text-5xl font-bold text-blue-500">{totalStudents}</p>
          <FaUserGraduate className="text-blue-400 text-5xl mt-4" />
        </div>

        {/* Recently Added Student */}
        {recentStudent && (
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2">Recently Added Student</h2>
            <p className="text-lg font-semibold">{recentStudent.name}</p>
            <p className="text-md text-gray-600">Department: {recentStudent.department.toUpperCase()}</p>
            <FaUserGraduate className="text-green-400 text-5xl mt-4" />
          </div>
        )}
      </div>
      
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Year-wise Student Count</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(yearCounts).map(([year, count]) => (
            <div 
              key={year} 
              className={`p-6 rounded-lg shadow-md transition-shadow duration-300 flex flex-col items-center hover:shadow-lg ${getYearColor(year)}`}
            >
              <h3 className="text-lg font-semibold mb-2">Year {year}</h3>
              <p className="text-3xl font-bold">{count}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Department-wise Student Count</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments
            .filter(department => department.value !== '')
            .map(({ value, label }, index) => {
              const icons = {
                cse: <RiComputerLine />,        // CSE
                ece: <RiBatteryChargeLine />,   // ECE
                eee: <RiToolsLine />,           // EEE
                it: <SiPython />,               // IT
                mech: <MdConstruction />,       // Mechanical
                mct: <GiRobotGolem />,          // Mechatronics (MCT)
                aids: <GiArtificialIntelligence />,  // AI and Data Science
                csd: <SiPostgresql />,          // CSD
                civil: <MdOutlineArchitecture />, // Civil Engineering
                csbs: <GiBrain />,              // CSBS
                'cse(cy)': <GiLockedFortress /> // CSE(CY) - Cyber Security
              };
              
              return (
                <div
                key={value}
                className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-white ${getColor(value)} ${index === departments.length - 1 ? 'mx-auto col-span-full' : ''}`} // Centering the last department
                >
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{label}</h3>
                  <div className="text-4xl mb-2">{icons[value]}</div> {/* Display the icon */}
                  <p className="text-2xl font-bold mt-2">{departmentCounts[value] || 0}</p>
                </div>
              );
            })}
        </div>
      </div>

      <footer className="mt-8 text-center">
        <p className="text-sm">© 2024 Student Management System</p>
      </footer>
    </div>
  );

  function getColor(value) {
    switch (value) {
      case 'cse':
        return 'bg-blue-500';
      case 'ece':
        return 'bg-green-500';
      case 'eee':
        return 'bg-red-500';
      case 'it':
        return 'bg-yellow-500';
      case 'mech':
        return 'bg-purple-500';
      case 'aids':
        return 'bg-pink-500';
      case 'csd':
        return 'bg-indigo-500';
      case 'civil':
        return 'bg-orange-500';
      case 'chemical':
        return 'bg-teal-500';
      case 'csbs':
        return 'bg-lime-500';
      case 'cse(cy)':
        return 'bg-blue-600'; // CSE(CY) background
      default:
        return 'bg-gray-400';
    }
  }

  function getYearColor(year) {
    const colors = {
      '1': 'bg-red-300',     // Color for Year 1
      '2': 'bg-orange-300',  // Color for Year 2
      '3': 'bg-yellow-300',  // Color for Year 3
      '4': 'bg-green-300',   // Color for Year 4
      '5': 'bg-blue-300',    // Color for Year 5
      'Unknown': 'bg-gray-300' // Color for Unknown
    };
    return colors[year] || 'bg-gray-400'; // Default color
  }
};