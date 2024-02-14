import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { getTodos } from "@/lib/redux/todo/todoSlice";
import { todoItem } from "@/types";
import { useEffect } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.auth);
  const { todosList } = useAppSelector((state) => state.todo);
  useEffect(() => {
    if (email) {
      dispatch(getTodos(email));
    }
  }, []);

  const renderTodosList = () => {
    if (todosList?.length) {
      return todosList.map((todo: todoItem) => {
        return (
          <TodoItem key={todo.$id} todo={todo.todo} createdAt={todo.$createdAt}/>
        );
      });
    }
    return <div>There ain't any items yet</div>
  };
  return (
    <section className="mt-8 flex flex-col items-center">
      <h1 className="text-6xl font-bold">Your tasks</h1>
      <ul className="grid mt-5 grid-cols-1 w-full gap-3">
        {renderTodosList()}
      </ul>
    </section>
  );
};

export default TodoList;
