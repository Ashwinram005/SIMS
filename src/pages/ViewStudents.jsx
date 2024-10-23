import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { departments } from './departments'; // Adjust the import path as needed
import { FaEdit, FaTrash, FaClipboardList } from 'react-icons/fa';

export const ViewStudents = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Filtering students based on search term, department, and year
  const filteredStudents = students.filter(student => {
    const matchesDepartment = selectedDepartment === '' || student.department.toLowerCase() === selectedDepartment.toLowerCase();
    const matchesYear = selectedYear === '' || student.yearOfStudy === selectedYear;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.registerNumber.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch && matchesDepartment && matchesYear;
  });

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen flex flex-col items-center p-4 md:p-8 lg:p-10 text-gray-800">
      {/* Search Bar */}
      <div className="w-full max-w-xl mb-6">
        <input
          type="text"
          placeholder="Search by name or register number..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm bg-white text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 w-full max-w-xl">
        <select
          className="flex-grow p-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm bg-white text-gray-800"
          value={selectedDepartment}
          onChange={e => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept.value} value={dept.value}>
              {dept.label}
            </option>
          ))}
        </select>

        <select
          className="flex-grow p-4 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm bg-white text-gray-800"
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
        >
          <option value="">All Years</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
      </div>

      {/* Table */}
      <div className="w-full max-w-4xl overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-2 py-2 md:px-4 md:py-4 text-left text-sm md:text-base">Register Number</th>
              <th className="px-2 py-2 md:px-4 md:py-4 text-left text-sm md:text-base">Name</th>
              <th className="px-2 py-2 md:px-4 md:py-4 text-left text-sm md:text-base">Department</th>
              <th className="px-2 py-2 md:px-4 md:py-4 text-left text-sm md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-200 divide-y divide-gray-300 text-gray-800">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student.id} className={`hover:bg-gray-300 transition duration-300 ${index % 2 === 0 ? 'bg-gray-200' : ''}`}>
                  <td className="border px-2 py-2 md:px-4 md:py-4 text-sm md:text-base">{student.registerNumber}</td>
                  <td className="border px-2 py-2 md:px-4 md:py-4 text-sm md:text-base">{student.name}</td>
                  <td className="border px-2 py-2 md:px-4 md:py-4 text-sm md:text-base">{student.department.toUpperCase()}</td>
                  <td className="border px-2 py-2 md:px-4 md:py-4 text-sm md:text-base flex justify-center gap-2">
                    <Link to={`/student/${student.id}`} title="View Details">
                      <button className="flex items-center justify-center w-8 h-8 text-green-600 hover:text-green-800">
                        <FaClipboardList />
                      </button>
                    </Link>
                    <button className="flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-800" title="Edit">
                      <FaEdit />
                    </button>
                    <button className="flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-800" title="Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
