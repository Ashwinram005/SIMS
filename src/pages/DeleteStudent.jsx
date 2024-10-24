import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/info';
import { AppContext } from '../App';

export const DeleteStudent = () => {
  const { setActiveItem } = useContext(AppContext);
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(true); // New state for the introductory modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

  const handleBack = () => {
    setActiveItem('vs');
    navigate('/landing');
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/students/${id}`);
      setActiveItem('vs');
      navigate('/landing'); // Navigate to view students after successful deletion
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleShowConfirm = () => {
    setShowConfirmModal(true); // Show confirm delete modal
  };

  const handleCancel = () => {
    setShowConfirmModal(false); // Close the modal without deleting
  };

  const handleCloseIntroModal = () => {
    setShowIntroModal(false); // Close the introductory modal
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!student) return <div className="p-4 text-center">Student not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border border-gray-200">
        
        {/* Header with Back Button */}
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{`${student.name}`}</h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Back
          </button>
        </div>

        {/* Student Details */}
        <div className="space-y-4">
          <p className="text-lg text-gray-700"><strong>Register Number:</strong> {student.registerNumber}</p>
          <p className="text-lg text-gray-700"><strong>Name:</strong> {student.name}</p>
          <p className="text-lg text-gray-700"><strong>Email:</strong> {student.email}</p>
          <p className="text-lg text-gray-700"><strong>Phone Number:</strong> {student.mobilenumber}</p>
          <p className="text-lg text-gray-700"><strong>Department:</strong> {student.department.toUpperCase()}</p>
          <p className="text-lg text-gray-700"><strong>Date of Birth:</strong> {student.dob}</p>
          <p className="text-lg text-gray-700"><strong>Gender:</strong> {student.gender.toUpperCase()}</p>
          <p className="text-lg text-gray-700"><strong>Year of Study:</strong> {student.yearOfStudy}</p>
          <p className="text-lg text-gray-700"><strong>Enrollment Date:</strong> {student.enrollmentDate}</p>
          <p className="text-lg text-gray-700"><strong>Address:</strong> {student.address.toUpperCase()}</p>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleShowConfirm}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>{student.name}</strong>?
              </p>
              <div className="flex justify-around">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Introductory Modal */}
        {showIntroModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <h2 className="text-xl font-bold text-red-700 mb-4">Attention!</h2>
              <p className="text-lg text-red-700 mb-6 italic">
                You are about to delete a student's record. Please review the details below carefully before proceeding. 
                Once deleted, this action cannot be undone.
              </p>
              <button
                onClick={handleCloseIntroModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
