import AddTodo from "@/components/AddTodo/AddTodo";
import TodoList from "@/components/Todos/TodoList";
import { useAppSelector } from "@/lib/redux/store";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isEmailVerified } = useAppSelector((state) => state.auth);

  if (isEmailVerified === false) {
    return <Navigate to="/verifying" />;
  }

  return (
    <div className="w-[1280px] mx-auto">
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Dashboard;
