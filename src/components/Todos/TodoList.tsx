import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { getTodos } from "@/lib/redux/todo/todoSlice";
import { TitleType, TodoItem as TodoItemType } from "@/types";
import { useEffect } from "react";
import TodoItem from "./TodoItem";
import { Skeleton } from "../ui/skeleton";
import Loader from "../Loader/Loader";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.auth);
  const { todosList, completed, toComplete } = useAppSelector(
    (state) => state.todo
  );
  useEffect(() => {
    if (email) {
      dispatch(getTodos(email));
    }
  }, []);

  const renderTodosList = (isCompletedList: boolean) => {
    if (todosList !== null) {
      if (isCompletedList && completed > 0) {
        return Object.values(todosList).map((todo: TodoItemType) => {
          if (todo.isCompleted) {
            return (
              <TodoItem
                key={todo.$id}
                todo={todo.todo}
                createdAt={todo.$createdAt}
                isCompleted={todo.isCompleted}
                id={todo.$id}
              />
            );
          }
        });
      } else if (!isCompletedList && toComplete > 0) {
        return Object.values(todosList).map((todo: TodoItemType) => {
          if (!todo.isCompleted) {
            return (
              <TodoItem
                key={todo.$id}
                todo={todo.todo}
                createdAt={todo.$createdAt}
                isCompleted={todo.isCompleted}
                id={todo.$id}
              />
            );
          }
        });
      }
      return <></>
    }
    return (
      <>
        <Skeleton className="w-full h-[80px] rounded-2xl border-2 shadow" />
        <Skeleton className="w-full h-[80px] rounded-2xl border-2 shadow" />
        <Skeleton className="w-full h-[80px] rounded-2xl border-2 shadow" />
      </>
    );
  };

  const renderTitle = (titleType: TitleType, countOfTasks: number) => {
    if (todosList === null) {
      return (
        <Loader
          message="Your tasks are loading..."
          loaderHeight={60}
          loaderWidth={60}
        />
      );
    }
    switch (titleType) {
      case "toComplete":
        if (countOfTasks === 0) {
          return "No tasks yet. Add one above";
        }
        if (countOfTasks === 1) {
          return "Need to do only one task";
        }
        return `Need to do ${countOfTasks} tasks`;
      case "completed":
        if (countOfTasks === 0) {
          return "No tasks completed yet";
        }
        if (countOfTasks === 1) {
          return "You've complete 1 task";
        }
        return `You've complete ${countOfTasks} tasks`;
      default:
        return `Total tasks: ${countOfTasks}`;
    }
  };
  return (
    <>
      <section className="mt-8 flex flex-col items-center">
        <h1 className="text-6xl font-bold">
          {renderTitle("toComplete", toComplete)}
        </h1>
        <ul className="grid mt-5 grid-cols-1 w-full gap-3">
          {renderTodosList(false)}
        </ul>
      </section>
      <section className="mt-8 flex flex-col items-center">
        <h1 className="text-6xl font-bold">
          {renderTitle("completed", completed)}
        </h1>
        <ul className="grid mt-5 grid-cols-1 w-full gap-3">
          {renderTodosList(true)}
        </ul>
      </section>
    </>
  );
};

export default TodoList;
