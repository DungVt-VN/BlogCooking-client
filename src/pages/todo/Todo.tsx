import React, { useState, useEffect } from "react";

// Định nghĩa kiểu Todo
interface Todo {
  id: number;
  name: string;
  priority: "Highest" | "Medium" | "Normal";
  isCompleted: boolean;
  isDeleted: boolean;
}

// Định nghĩa kiểu cho dữ liệu trả về của API
interface PaginatedTodos {
  todos: Todo[];
  totalPages: number;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"todo" | "completed" | "deleted">(
    "todo"
  );

  // Lấy danh sách Todo từ API
  useEffect(() => {
    fetchTodos(page);
  }, [page, searchQuery]);

  const fetchTodos = async (page: number) => {
    const response = await fetch(
      `/api/todos?page=${page}&size=10&search=${searchQuery}`
    );
    const data: PaginatedTodos = await response.json();
    setTodos(data.todos);
    setTotalPages(data.totalPages);
  };

  // Xử lý tìm kiếm Todo
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Xóa Todo
  const handleDeleteTodo = async (id: number) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa Todo này?");
    if (confirmed) {
      await fetch(`/api/todos/${id}`, { method: "DELETE" });
      fetchTodos(page);
    }
  };

  // Khôi phục Todo đã bị xóa
  const handleRestoreTodo = async (id: number) => {
    const confirmed = window.confirm("Bạn có chắc muốn khôi phục Todo này?");
    if (confirmed) {
      await fetch(`/api/todos/restore/${id}`, { method: "POST" });
      fetchTodos(page);
    }
  };

  // Xóa mềm Todo
  const handleSoftDelete = async (id: number) => {
    await fetch(`/api/todos/soft-delete/${id}`, { method: "POST" });
    fetchTodos(page);
  };

  // Xóa nhiều Todo
  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa tất cả Todo đã chọn?"
    );
    if (confirmed) {
      await fetch(`/api/todos/delete-all`, {
        method: "POST",
        body: JSON.stringify({ ids: selectedTodos }),
        headers: { "Content-Type": "application/json" },
      });
      fetchTodos(page);
    }
  };

  // Chuyển tab
  const handleTabChange = (tab: "todo" | "completed" | "deleted") => {
    setActiveTab(tab);
  };

  return (
    <div className="todo-page">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <button
          onClick={() => (window.location.href = "user/createtodo")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Tạo Mới Todo
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Tìm kiếm Todo"
          className="border border-gray-300 rounded px-4 py-2 w-1/2"
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 p-4">
        <button
          onClick={() => handleTabChange("todo")}
          className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Todo Chưa Làm
        </button>
        <button
          onClick={() => handleTabChange("completed")}
          className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Todo Hoàn Thành
        </button>
        <button
          onClick={() => handleTabChange("deleted")}
          className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Todo Đã Xóa
        </button>
      </div>

      {/* Todo List */}
      <div className="p-4 space-y-4">
        {activeTab === "todo" && (
          <div>
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex justify-between items-center bg-white p-4 rounded shadow-md hover:bg-gray-50 transition"
              >
                <span>{todo.name}</span>
                <span style={{ color: getPriorityColor(todo.priority) }}>
                  {todo.priority}
                </span>
                <button
                  onClick={() =>
                    (window.location.href = `/edit-todo/${todo.id}`)
                  }
                  className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
                >
                  Xóa
                </button>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTodos([...selectedTodos, todo.id]);
                    } else {
                      setSelectedTodos(
                        selectedTodos.filter((id) => id !== todo.id)
                      );
                    }
                  }}
                  className="ml-4"
                />
              </div>
            ))}
            <button
              onClick={handleDeleteAll}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Xóa Tất Cả Đã Chọn
            </button>
          </div>
        )}

        {activeTab === "completed" && (
          <div>
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex justify-between items-center bg-white p-4 rounded shadow-md hover:bg-gray-50 transition"
              >
                <span>{todo.name}</span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
                >
                  Xóa
                </button>
                <button
                  onClick={() => handleRestoreTodo(todo.id)}
                  className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition"
                >
                  Khôi Phục
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "deleted" && (
          <div>
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex justify-between items-center bg-white p-4 rounded shadow-md hover:bg-gray-50 transition"
              >
                <span>{todo.name}</span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
                >
                  Xóa Vĩnh Viễn
                </button>
                <button
                  onClick={() => handleRestoreTodo(todo.id)}
                  className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition"
                >
                  Khôi Phục
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition disabled:bg-gray-200"
        >
          Trước
        </button>
        <span>
          {page}/{totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition disabled:bg-gray-200"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

// Hàm giúp hiển thị màu sắc ưu tiên
const getPriorityColor = (priority: "Highest" | "Medium" | "Normal") => {
  switch (priority) {
    case "Highest":
      return "red";
    case "Medium":
      return "yellow";
    case "Normal":
      return "green";
    default:
      return "black";
  }
};

export default Todo;
