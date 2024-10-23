import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/info'; // Your API module for making requests

const EditStudent = ({ setActiveItem }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [originalStudent, setOriginalStudent] = useState(null);
  const [student, setStudent] = useState({
    name: '',
    dob: '',
    gender: '',
    department: '',
    mobilenumber: '',
    address: '',
    email: '',
    enrollmentDate: '',
    yearOfStudy: ''
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({}); // State to track form validation errors
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await api.get(`/students/${id}`);
        setOriginalStudent(response.data);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setErrorMessage('Failed to fetch student data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    // Check for empty fields
    for (const key in student) {
      if (!student[key]) {
        newErrors[key] = 'This field is required';
      }
    }
    // Check for valid year of study
    if (student.yearOfStudy && isNaN(student.yearOfStudy)) {
      newErrors.yearOfStudy = 'Year of Study must be a number';
    }
    // Check for valid mobile number (10 digits)
    if (student.mobilenumber && !/^\d{10}$/.test(student.mobilenumber)) {
      newErrors.mobilenumber = 'Mobile number must be 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSave = async () => {
    if (!validateForm()) return; // Validate before saving

    try {
      await api.put(`/students/${id}`, student);
      setSuccessMessage('Student updated successfully!');
      setErrorMessage('');
      setActiveItem('vs');
      navigate('/landing');
    } catch (error) {
      console.error("There was an error updating the student!", error);
      setErrorMessage('Failed to update student. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleBack = () => {
    setActiveItem('vs');
    navigate('/landing');
  };

  const hasChanges = JSON.stringify(originalStudent) !== JSON.stringify(student);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-6">Edit Student</h2>
        
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name" className="text-lg font-medium text-gray-700">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Full Name"
              value={student.name}
              onChange={e => setStudent({ ...student, name: e.target.value })}
              className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label htmlFor="dob" className="text-lg font-medium text-gray-700">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={student.dob}
              onChange={e => setStudent({ ...student, dob: e.target.value })}
              className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender" className="text-lg font-medium text-gray-700">Gender:</label>
            <select
              name="gender"
              id="gender"
              value={student.gender}
              onChange={e => setStudent({ ...student, gender: e.target.value })}
              required
              className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          {/* Department Dropdown */}
          <div className="form-group">
            <label htmlFor="department" className="text-lg font-medium text-gray-700">Department:</label>
            <select
              name="department"
              id="department"
              value={student.department}
              required
              onChange={e => setStudent({ ...student, department: e.target.value })}
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
            {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <label htmlFor="mobilenumber" className="text-lg font-medium text-gray-700">Mobile Number:</label>
            <input
              type="text"
              id="mobilenumber"
              name="mobilenumber"
              placeholder="Enter Mobile Number"
              value={student.mobilenumber}
              required
              onChange={e => setStudent({ ...student, mobilenumber: e.target.value })}
              className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.mobilenumber && <p className="text-red-500 text-sm">{errors.mobilenumber}</p>}
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address" className="text-lg font-medium text-gray-700">Address:</label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter Address"
              required
              value={student.address}
              onChange={e => setStudent({ ...student, address: e.target.value })}
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-28"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={student.email}
              required
              onChange={e => setStudent({ ...student, email: e.target.value })}
              className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Enrollment Date */}
          <div className="form-group">
            <label htmlFor="enrollmentDate" className="text-lg font-medium text-gray-700">Enrollment Date:</label>
            <input
              type="date"
              id="enrollmentDate"
              name="enrollmentDate"
              value={student.enrollmentDate}
              required
              onChange={e => setStudent({ ...student, enrollmentDate: e.target.value })}
              className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.enrollmentDate && <p className="text-red-500 text-sm">{errors.enrollmentDate}</p>}
          </div>

          {/* Year of Study */}
          <div className="form-group">
            <label htmlFor="yearOfStudy" className="text-lg font-medium text-gray-700">Year of Study:</label>
            <select
              id="yearOfStudy"
              name="yearOfStudy"
              value={student.yearOfStudy}
              onChange={e => setStudent({ ...student, yearOfStudy: e.target.value })}
              required
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Year</option>
              {Array.from({ length: 4 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}st Year
                </option>
              ))}
            </select>
            {errors.yearOfStudy && <p className="text-red-500 text-sm">{errors.yearOfStudy}</p>}
        </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${!hasChanges ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!hasChanges}
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-lg font-bold mb-4">Confirm Save Changes</h3>
              <p>Are you sure you want to save the changes?</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditStudent;
