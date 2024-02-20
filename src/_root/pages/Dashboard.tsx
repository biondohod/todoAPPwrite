import { FC } from "react";
import { Navigate } from "react-router-dom";

import AddTodo from "@/components/AddTodo/AddTodo";
import TodoList from "@/components/Todos/TodoList";
import { useAppSelector } from "@/lib/redux/store";

/**
 * Dashboard component.
 * Renders the dashboard page with the add todo form and todo list.
 */
const Dashboard: FC = () => {
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
