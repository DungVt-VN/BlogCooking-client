import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Cấu hình Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

interface TodoItem {
  id: number;
  title: string;
  createdAt: string;
  user: string;
  status: "completed" | "inProgress" | "notStarted"; // Trạng thái của todo
}

interface TodoStatisticsProps {
  todos: TodoItem[]; // Nhận todos từ props
}

const TodoStatistics: React.FC<TodoStatisticsProps> = ({ todos }) => {
  // Phân loại todos theo trạng thái
  const completedTodos = todos.filter((todo) => todo.status === "completed");
  const inProgressTodos = todos.filter((todo) => todo.status === "inProgress");
  const notStartedTodos = todos.filter((todo) => todo.status === "notStarted");

  // Cấu hình dữ liệu cho Pie chart
  const pieData = {
    labels: ["Đã làm", "Đang làm", "Chưa làm"],
    datasets: [
      {
        data: [
          completedTodos.length,
          inProgressTodos.length,
          notStartedTodos.length,
        ],
        backgroundColor: ["#4CAF50", "#FFEB3B", "#F44336"], // Màu sắc cho mỗi phần của pie chart
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="overflow-x-auto">
      {/* Thống kê hình cầu */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-center">
          Thống kê công việc
        </h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default TodoStatistics;
