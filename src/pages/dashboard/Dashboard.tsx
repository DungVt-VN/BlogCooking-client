import { FaPlay, FaCheck, FaClock, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex justify-center pt-32">
      <div className="p-6 h-full w-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Icon tổng số Todo đang thực hiện (Doing) */}
          <Link
            to="/user/todos/doing"
            className="flex items-center p-6 bg-white rounded-lg shadow-lg hover:bg-blue-100 transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            <FaPlay size={30} className="text-yellow-500 mr-4" />
            <span className="text-lg font-medium">Todo Đang Thực Hiện</span>
          </Link>

          {/* Icon tổng số Todo đã thực hiện (Done) */}
          <Link
            to="/user/todos/done"
            className="flex items-center p-6 bg-white rounded-lg shadow-lg hover:bg-blue-100 transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            <FaCheck size={30} className="text-green-500 mr-4" />
            <span className="text-lg font-medium">Todo Đã Thực Hiện</span>
          </Link>

          {/* Icon tổng số Todo chưa thực hiện (To do) */}
          <Link
            to="/user/todos/todo"
            className="flex items-center p-6 bg-white rounded-lg shadow-lg hover:bg-blue-100 transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            <FaClock size={30} className="text-blue-500 mr-4" />
            <span className="text-lg font-medium">Todo Chưa Thực Hiện</span>
          </Link>

          {/* Icon tổng số Todo đã bị xóa và đang trong thời hạn confirm */}
          <Link
            to="/user/todos/deleted"
            className="flex items-center p-6 bg-white rounded-lg shadow-lg hover:bg-blue-100 transform transition-all duration-300 ease-in-out hover:scale-105"
          >
            <FaTrashAlt size={30} className="text-red-500 mr-4" />
            <span className="text-lg font-medium">Todo Đã Xóa</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
