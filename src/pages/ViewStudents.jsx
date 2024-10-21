import { useState } from 'react';
import { departments } from './departments'; // Adjust the import path as needed

export const ViewStudents = ({ students }) => { // Accept students as a prop
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Filtering students based on search term, department, and year
  const filteredStudents = students.filter(student => {
    // Check if the department matches the selected department or if no department is selected
    const matchesDepartment = selectedDepartment === '' || student.department.toLowerCase() === selectedDepartment.toLowerCase();
    const matchesYear = selectedYear === '' || student.yearOfStudy === selectedYear;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.registerNumber.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch && matchesDepartment && matchesYear;
  });

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center p-4 md:p-8 lg:p-10 text-white">
      {/* Search Bar */}
      <div className="w-full max-w-xl mb-6">
        <input
          type="text"
          placeholder="Search by name or register number..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full p-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm bg-gray-700 text-white placeholder-gray-400"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 w-full max-w-xl">
        <select
          className="flex-grow p-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm bg-gray-700 text-white"
          value={selectedDepartment}
          onChange={e => setSelectedDepartment(e.target.value)}
        >
          {departments.map(dept => (
            <option key={dept.value} value={dept.value}>
              {dept.label}
            </option>
          ))}
        </select>

        <select
          className="flex-grow p-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm bg-gray-700 text-white"
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
      <div className="w-full max-w-4xl overflow-x-auto bg-gray-700 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-2 py-2 md:px-4 md:py-4 text-left text-sm md:text-base">Register Number</th>
              <th className="px-2 py-2 md:px-4 md:py-4 text-left text-sm md:text-base">Name</th>
              <th className="px-2 py-2 md:px-4 md:py-4 text-left text-sm md:text-base">Department</th>
              <th className="px-2 py-2 md:px-4 md:py-4 text-left text-sm md:text-base">Year</th>
              <th className="px-2 py-2 md:px-4 md:py-4 text-left text-sm md:text-base">Email</th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-gray-300 text-white">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student.id} className={`hover:bg-gray-600 transition duration-300 ${index % 2 === 0 ? 'bg-gray-800' : ''}`}>
                  <td className="border px-2 py-2 md:px-4 md:py-4 text-sm md:text-base">{student.registerNumber}</td>
                  <td className="border px-2 py-2 md:px-4 md:py-4 text-sm md:text-base">{student.name}</td>
                  <td className="border px-2 py-2 md:px-4 md:py-4 text-sm md:text-base">{student.department.toUpperCase()}</td> {/* Convert department to uppercase */}
                  <td className="border px-2 py-2 md:px-4 md:py-4 text-sm md:text-base">{student.yearOfStudy}</td>
                  <td className="border px-2 py-2 md:px-4 md:py-4 text-sm md:text-base">{student.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
