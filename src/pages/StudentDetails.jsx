import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/info';

export const StudentDetails = ({ setActiveItem }) => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!student) return <div className="p-4 text-center">Student not found</div>;

  const handleBack = () => {
    setActiveItem('vs');
    navigate('/landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border border-gray-200">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{student.name}</h1>
          <button 
            onClick={handleBack} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Back
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-lg text-gray-700"><strong>Register Number:</strong> {student.registerNumber}</p>
          <p className="text-lg text-gray-700"><strong>Name:</strong> {student.name}</p>
          <p className="text-lg text-gray-700"><strong>Department:</strong> <span className="text-blue-600">{student.department.toUpperCase()}</span></p>
          <p className="text-lg text-gray-700"><strong>DOB:</strong> {student.dob}</p>
          <p className="text-lg text-gray-700"><strong>Gender:</strong> {student.gender}</p>
          <p className="text-lg text-gray-700"><strong>Mobile Number:</strong> {student.mobilenumber}</p>
          <p className="text-lg text-gray-700"><strong>Email:</strong> <span className="text-blue-600">{student.email}</span></p>
          <p className="text-lg text-gray-700"><strong>Address:</strong> {student.address}</p>
          <p className="text-lg text-gray-700"><strong>Enrollment Date:</strong> {student.enrollmentDate}</p>
          <p className="text-lg text-gray-700"><strong>Year of Study:</strong> {student.yearOfStudy}</p>
        </div>
      </div>
    </div>
  );
};
