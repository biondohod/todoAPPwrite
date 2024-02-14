import AddTodo from "@/components/AddTodo/AddTodo";
import TodoList from "@/components/Todos/TodoList";
import { getTodos } from "@/lib/appwrite/api";
import { useAppSelector } from "@/lib/redux/store";
import { useEffect } from "react";

const Home = () => {
  const { email } = useAppSelector((state) => state.auth);
  return (
    <div className="w-[1280px] mx-auto">
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Home;
