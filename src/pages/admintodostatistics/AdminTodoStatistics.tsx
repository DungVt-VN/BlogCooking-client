import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoStatistics from "../../components/todostatistics/TodoStatistics.tsx"; // Import component con

const AdminTodoStatistics: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]); // State lưu danh sách TODO
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
    <div>
      <TodoStatistics todos={todos} /> {/* Truyền todos vào TodoStatistics */}
    </div>
  );
};

export default AdminTodoStatistics;
