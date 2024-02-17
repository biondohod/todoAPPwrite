import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { getTodos } from "@/lib/redux/todo/todoSlice";
import { todoItem } from "@/types";
import { useEffect } from "react";
import TodoItem from "./TodoItem";
import { Skeleton } from "../ui/skeleton";
import Loader from "../Loader/Loader";

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
          <TodoItem key={todo.$id} todo={todo.todo} createdAt={todo.$createdAt} isCompleted={todo.isCompleted} id={todo.$id}/>
        );
      });
    }
    return (
      <>
      <Skeleton className="w-full h-[80px] rounded-2xl border-2 shadow" />
      <Skeleton className="w-full h-[80px] rounded-2xl border-2 shadow" />
      <Skeleton className="w-full h-[80px] rounded-2xl border-2 shadow" />
      </>
    )
  };

  const renderTitle = () => {
    if (todosList === null) {
      return <Loader message="Your tasks are loading..." loaderHeight={60} loaderWidth={60}/>
    }
    if (todosList.length === 0) {
      return "No tasks yet. Add one above"
      
    }
    if (todosList.length === 1) {
      return "Need to do only one task"
    }
    return `Need to do ${todosList.length} tasks`
  }
  return (
    <section className="mt-8 flex flex-col items-center">
      <h1 className="text-6xl font-bold">
        {renderTitle()}
      </h1>
      <ul className="grid mt-5 grid-cols-1 w-full gap-3">
        {renderTodosList()}
      </ul>
    </section>
  );
};

export default TodoList;
