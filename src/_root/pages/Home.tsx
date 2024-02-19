import AddTodo from "@/components/AddTodo/AddTodo";
import TodoList from "@/components/Todos/TodoList";

const Home = () => {
  return (
    <div className="w-[1280px] mx-auto">
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Home;
