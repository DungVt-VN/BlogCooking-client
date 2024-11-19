import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Định nghĩa kiểu Todo
interface Todo {
  id: number;
  name: string;
  priority: "Highest" | "Medium" | "Normal";
}

const CreateTodo: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [priority, setPriority] = useState<"Highest" | "Medium" | "Normal">(
    "Normal"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]); // Quản lý Todo đã chọn
  const [todos, setTodos] = useState<Todo[]>([]); // Danh sách Todo
  const navigate = useNavigate();

  // Hàm gửi dữ liệu Todo lên API
  const handleCreateTodo = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const newTodo: Todo = {
      id: Date.now(), // Mã Todo sẽ được tạo tự động
      name,
      priority,
    };

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        alert("Tạo Todo thành công!");
        navigate("/todos"); // Quay lại trang danh sách Todo
      } else {
        alert("Đã có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (error) {
      alert("Lỗi kết nối với server, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  // Hàm để xử lý checkbox (chọn Todo)
  const handleTodoCheckboxChange = (id: number) => {
    setSelectedTodos((prevSelectedTodos) =>
      prevSelectedTodos.includes(id)
        ? prevSelectedTodos.filter((todoId) => todoId !== id)
        : [...prevSelectedTodos, id]
    );
  };

  // Hàm xóa Todo đã chọn
  const handleDeleteSelectedTodos = async () => {
    if (selectedTodos.length === 0) {
      alert("Vui lòng chọn Todo để xóa!");
      return;
    }

    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa các Todo đã chọn?"
    );
    if (confirmDelete) {
      // Gửi yêu cầu xóa Todo đã chọn lên API
      const response = await fetch("/api/todos/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedTodos }),
      });

      if (response.ok) {
        alert("Đã xóa các Todo đã chọn!");
        // Cập nhật lại danh sách Todo
        setTodos(todos.filter((todo) => !selectedTodos.includes(todo.id)));
        setSelectedTodos([]); // Xóa danh sách Todo đã chọn
      } else {
        alert("Đã có lỗi xảy ra khi xóa Todo!");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Tạo Mới Todo</h2>
      <form onSubmit={handleCreateTodo} className="space-y-4">
        <div className="form-group">
          <label htmlFor="name" className="block text-lg">
            Tên Todo
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nhập tên Todo"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority" className="block text-lg">
            Mức độ ưu tiên
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "Highest" | "Medium" | "Normal")
            }
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Highest">Cao nhất</option>
            <option value="Medium">Trung bình</option>
            <option value="Normal">Bình thường</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition-all"
          disabled={loading}
        >
          {loading ? "Đang tạo..." : "Tạo Todo"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-6">Danh Sách Todo</h3>
      <div className="mt-4">
        <button
          onClick={handleDeleteSelectedTodos}
          disabled={selectedTodos.length === 0}
          className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-all mb-4"
        >
          Xóa Tất Cả Todo Đã Chọn
        </button>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between space-x-4 py-2 border-b"
            >
              <input
                type="checkbox"
                checked={selectedTodos.includes(todo.id)}
                onChange={() => handleTodoCheckboxChange(todo.id)}
                className="h-5 w-5"
              />
              <span
                style={{
                  color:
                    todo.priority === "Highest"
                      ? "red"
                      : todo.priority === "Medium"
                        ? "yellow"
                        : "green",
                }}
                className="flex-1"
              >
                {todo.name} - {todo.priority}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateTodo;
