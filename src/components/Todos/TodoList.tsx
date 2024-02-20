import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { getTodos } from "@/lib/redux/todo/todoSlice";
import { TitleType, TodoItem as TodoItemType } from "@/types";

import TodoItem from "./TodoItem";
import { Skeleton } from "../ui/skeleton";
import Loader from "../Loader/Loader";

/**
 * Renders a list of todos, divided into two sections: "toComplete" and "completed".
 *
 * Fetches todos from the server based on the user's email.
 *
 * Displays a loading message while fetching todos.
 *
 * Renders a skeleton UI if todos are still loading.
 */

const TodoList: FC = () => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.auth);
  const { todosList, completed, toComplete } = useAppSelector(
    (state) => state.todo
  );

  useEffect(() => {
    if (email) {
      dispatch(getTodos(email));
    }
  }, [dispatch, email]);

  /**
   * Renders the list of todos based on the completion status.
   * @param isCompletedList - Indicates whether the list should display completed or incomplete todos.
   * @returns The rendered list of todos.
   */
  const renderTodosList = (isCompletedList: boolean) => {
    if (todosList !== null) {
      const filteredTodos = Object.values(todosList).filter(
        (todo: TodoItemType) => todo.isCompleted === isCompletedList
      );

      return filteredTodos.map((todo: TodoItemType) => (
        <TodoItem
          key={todo.$id}
          todo={todo.todo}
          createdAt={todo.$createdAt}
          isCompleted={todo.isCompleted}
          id={todo.$id}
        />
      ));
    }

    return (
      <>
        <Skeleton className="w-full h-[80px] rounded-2xl border-2 shadow" />
        <Skeleton className="w-full h-[80px] rounded-2xl border-2 shadow" />
      </>
    );
  };

  /**
   * Renders the title based on the title type and count of tasks.
   * @param titleType - The type of title to render. Should be "toComplete" or "completed"
   * @param countOfTasks - The number of tasks.
   * @returns The rendered title.
   */
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
          return "";
        }
        if (countOfTasks === 1) {
          return "You've completed 1 task";
        }
        return `You've completed ${countOfTasks} tasks`;
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
