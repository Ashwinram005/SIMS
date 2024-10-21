import dimg from "../assets/employee_and_student_management_system_dashboard_slide01.jpg";
export const Home = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden mt-0">
      <img
        src={dimg}
        alt="Employee and Student Management System"
        className="absolute inset-0 object-cover w-full h-full"
      />
    </div>
  );
};
