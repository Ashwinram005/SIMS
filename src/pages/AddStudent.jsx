import { useState } from 'react';
import api from '../api/info';

export const AddStudent = ({ onAddStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    department: '',
    mobilenumber: '',
    address: '',
    email: '',
    enrollmentDate: '',
    yearOfStudy: '',
    studentPhoto: null,
    idProof: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const generateRegisterNumber = (enrollmentDate, department) => {
    const year = enrollmentDate.split('-')[0]; // Extracting year from the date
    const departmentCode = department.substring(0, 3).toLowerCase(); // First three letters of department
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `${year}${randomDigits}${departmentCode}${randomDigits}`; // Format: 727723eucs021
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate register number based on enrollment date and department
    const registerNumber = generateRegisterNumber(formData.enrollmentDate, formData.department);

    // Create JSON object for student data
    const studentData = {
      name: formData.name,
      dob: formData.dob,
      gender: formData.gender,
      department: formData.department,
      mobilenumber: formData.mobilenumber,
      address: formData.address,
      email: formData.email,
      enrollmentDate: formData.enrollmentDate,
      yearOfStudy: formData.yearOfStudy,
      registerNumber: registerNumber, // Generated register number
    };

    try {
      const response = await api.post("/students", studentData); // Send as JSON
      if (response.status === 201) {
        alert('Student added successfully!');
        onAddStudent();
        setFormData({
          name: '',
          dob: '',
          gender: '',
          department: '',
          mobilenumber: '',
          address: '',
          email: '',
          enrollmentDate: '',
          yearOfStudy: '',
          studentPhoto: null,
          idProof: null,
        });
      } else {
        alert('Failed to add student.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the student.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-blue-800 text-center mb-6">Add New Student</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="text-lg font-medium text-gray-700">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob" className="text-lg font-medium text-gray-700">Date of Birth:</label>
            <input
              type="date"
              name="dob"
              id="dob"
              required
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender" className="text-lg font-medium text-gray-700">Gender:</label>
            <select
              name="gender"
              id="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="department" className="text-lg font-medium text-gray-700">Department:</label>
            <select
              name="department"
              id="department"
              required
              value={formData.department}
              onChange={handleChange}
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Department</option>
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
              <option value="eee">EEE</option>
              <option value="it">IT</option>
              <option value="mech">MECHANICAL</option>
              <option value="mct">MCT</option>
              <option value="aids">AIDS</option>
              <option value="csd">CSD</option>
              <option value="cse(cy)">CSE(CY)</option>
              <option value="civil">CIVIL</option>
              <option value="csbs">CSBS</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="number" className="text-lg font-medium text-gray-700">Mobile Number:</label>
            <input
              type="tel"
              name="mobilenumber"
              id="number"
              placeholder="Enter a valid mobile number"
              pattern="[1-9][0-9]{9}"
              required
              value={formData.mobilenumber}
              onChange={handleChange}
              className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="text-lg font-medium text-gray-700">Address:</label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter full address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-28"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Email Address:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email ID"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="enrollmentDate" className="text-lg font-medium text-gray-700">Enrollment Date:</label>
            <input
              type="date"
              id="enrollmentDate"
              name="enrollmentDate"
              required
              value={formData.enrollmentDate}
              onChange={handleChange}
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearOfStudy" className="text-lg font-medium text-gray-700">Year of Study:</label>
            <select
              name="yearOfStudy"
              id="yearOfStudy"
              required
              value={formData.yearOfStudy}
              onChange={handleChange}
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="studentPhoto" className="text-lg font-medium text-gray-700">Student Photo:</label>
            <input
              type="file"
              id="studentPhoto"
              name="studentPhoto"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="idProof" className="text-lg font-medium text-gray-700">ID Proof:</label>
            <input
              type="file"
              id="idProof"
              name="idProof"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
