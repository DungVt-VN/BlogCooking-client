import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./AdminTodos";

const AdminTodos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // State lưu danh sách TODO
  const [loading, setLoading] = useState<boolean>(true); // State theo dõi trạng thái tải

  useEffect(() => {
    // Gọi API để lấy dữ liệu todos
    const fetchTodos = async () => {
      try {
        const response = await axios.get("https://example.com/api/todos"); // URL API của bạn
        setTodos(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false); // Dừng trạng thái loading
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị trạng thái tải
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="border border-gray-300 px-6 py-3 text-sm font-medium text-center">
              STT
            </th>
            <th className="border border-gray-300 px-6 py-3 text-sm font-medium text-left">
              Title
            </th>
            <th className="border border-gray-300 px-6 py-3 text-sm font-medium text-center">
              Create At
            </th>
            <th className="border border-gray-300 px-6 py-3 text-sm font-medium text-left">
              User
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr
              key={todo.id}
              className="hover:bg-gray-100 even:bg-gray-50 odd:bg-white text-gray-800"
            >
              <td className="border border-gray-300 px-6 py-3 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 px-6 py-3">{todo.title}</td>
              <td className="border border-gray-300 px-6 py-3 text-center">
                {new Date(todo.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-6 py-3">{todo.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTodos;
