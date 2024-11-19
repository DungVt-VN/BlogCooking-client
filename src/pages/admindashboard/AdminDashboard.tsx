import { FaUsers, FaTasks, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex justify-center">
      <div className="p-6 h-full w-[60%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Icon tổng số users */}
          <Link
            to="/admin/users"
            className="flex items-center p-6 bg-white rounded-lg shadow-lg hover:bg-blue-100 transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            <FaUsers size={30} className="text-blue-600 mr-4" />
            <span className="text-lg font-medium">Tổng số Users</span>
          </Link>

          {/* Icon tổng số TODO */}
          <Link
            to="/admin/todos"
            className="flex items-center p-6 bg-white rounded-lg shadow-lg hover:bg-blue-100 transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            <FaTasks size={30} className="text-blue-600 mr-4" />
            <span className="text-lg font-medium">Tổng số TODO</span>
          </Link>

          {/* Icon thống kê */}
          <Link
            to="/admin/statistics"
            className="flex items-center p-6 bg-white rounded-lg shadow-lg hover:bg-blue-100 transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            <FaChartBar size={30} className="text-blue-600 mr-4" />
            <span className="text-lg font-medium">Thống kê</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
