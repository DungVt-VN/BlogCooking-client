import { useEffect, useState } from "react";
import axios from "axios";

const AllUser = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch danh sách người dùng từ API
    axios
      .get("http://localhost:5001/api/users")
      .then((response) => {
        setUsers(response.data); // Lưu dữ liệu người dùng vào state
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-7xl px-4 py-6 flex flex-col">
        {/* Tiêu đề ở phía trên, có margin-bottom để tạo khoảng cách */}
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Tất cả Người Dùng
        </h1>
        {/* Table hiển thị danh sách người dùng */}
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-4 text-left">Tên Người Dùng</th>
              <th className="p-4 text-left">Họ và Tên</th>
              <th className="p-4 text-left">Ngày Sinh</th>
              <th className="p-4 text-left">Giới Tính</th>
              <th className="p-4 text-left">Tổng Số TODO</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userName} className="border-b hover:bg-gray-100">
                <td className="p-4">{user.userName}</td>
                <td className="p-4">
                  {user.firstName} {user.lastName}
                </td>
                <td className="p-4">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </td>
                <td className="p-4">
                  {user.gender === 1
                    ? "Nam"
                    : user.gender === 2
                      ? "Nữ"
                      : "Khác"}
                </td>
                <td className="p-4">{user.totalTodos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
