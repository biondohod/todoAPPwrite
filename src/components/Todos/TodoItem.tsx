import { TodoItemProps } from "@/types";
import { formatDate } from "@/utils/utils";
import { FC, useEffect } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { deleteTodo, updateTodo } from "@/lib/redux/todo/todoSlice";

const TodoItem: FC<TodoItemProps> = ({ createdAt, todo, isCompleted, id }) => {
  const dispatch = useAppDispatch()
  const {isLoading, todosList} = useAppSelector((state) => state.todo);
  let isCompletedTodo = isCompleted;
  useEffect(() => {
    if (todosList) {
      isCompletedTodo = todosList[id].isCompleted
    }
  }, [todosList])

  const toggleCompletedHandler = () => {
    dispatch(updateTodo({id: id, isCompleted: !isCompletedTodo}));
  }

  const deleteTodoHandler = () => {
    dispatch(deleteTodo(id));
  }
  
  return (
    <li className={`p-3 border-2 rounded-2xl flex justify-between items-center ${isCompletedTodo ? "shadow-inner opacity-80" : "shadow"}`}>
      <div>
        <h2 className={`text-xl ${isCompletedTodo ? "text-gray-500" : ""}`}>{todo}</h2>
        <span className="text-sm text-gray-400">{formatDate(createdAt)}</span>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center space-x-2">
          {todosList && (
            <Switch id="toggle-completed" disabled={isLoading} onClick={toggleCompletedHandler} checked={isCompletedTodo}/>
          )}
          <Label htmlFor="toggle-completed" className="text-lg">Completed</Label>
        </div>
        <Button variant="destructive" className="text-lg" disabled={isLoading} onClick={deleteTodoHandler}>
          Delete
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
