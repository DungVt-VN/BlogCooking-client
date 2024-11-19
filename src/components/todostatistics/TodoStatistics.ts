export default interface TodoItem {
  id: number;
  title: string;
  createdAt: string;
  user: string;
  status: "completed" | "inProgress" | "notStarted"; // Trạng thái của todo
}
