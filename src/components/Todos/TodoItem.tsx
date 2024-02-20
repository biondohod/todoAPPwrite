import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { deleteTodo, updateTodo } from "@/lib/redux/todo/todoSlice";

import { TodoItemProps } from "@/types";
import { formatDate } from "@/utils/utils";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

/**
 * Renders a single todo item.
 *
 * @param {TodoItemProps} props - The props for the TodoItem component.
 * @param {Date} props.createdAt - The creation date of the todo item.
 * @param {string} props.todo - The text content of the todo item.
 * @param {boolean} props.isCompleted - Indicates whether the todo item is completed or not.
 * @param {string} props.id - The unique identifier of the todo item.
 */
const TodoItem: FC<TodoItemProps> = ({ createdAt, todo, isCompleted, id }) => {
  const dispatch = useAppDispatch();
  const { isLoading, todosList } = useAppSelector((state) => state.todo);
  let isCompletedTodo: boolean = todosList?.[id]?.isCompleted ?? isCompleted;

  useEffect(() => {
    if (todosList) {
      isCompletedTodo = todosList[id].isCompleted;
    }
  }, [todosList]);

  const toggleCompletedHandler = async () => {
    await dispatch(updateTodo({ id, isCompleted: !isCompletedTodo }));
  };

  const deleteTodoHandler = async () => {
    await dispatch(deleteTodo(id));
  };

  const todoItemClass = `p-3 border-2 rounded-2xl flex justify-between items-center ${
    isCompletedTodo ? "shadow-inner opacity-80" : "shadow"
  }`;
  const todoTextClass = `text-xl ${isCompletedTodo ? "text-gray-500" : ""}`;

  return (
    <li className={todoItemClass}>
      <div>
        <h2 className={todoTextClass}>{todo}</h2>
        <span className="text-sm text-gray-400">{formatDate(createdAt)}</span>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Switch
            id="toggle-completed"
            disabled={isLoading}
            onClick={toggleCompletedHandler}
            checked={isCompletedTodo}
          />
          <Label htmlFor="toggle-completed" className="text-lg">
            Completed
          </Label>
        </div>

        <Button
          variant="destructive"
          className="text-lg"
          disabled={isLoading}
          onClick={deleteTodoHandler}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};


export default TodoItem;
