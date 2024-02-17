import { TodoItemProps } from "@/types";
import { formatDate } from "@/utils/utils";
import { FC } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { updateTodo } from "@/lib/redux/todo/todoSlice";

const TodoItem: FC<TodoItemProps> = ({ createdAt, todo, isCompleted, id }) => {
  const dispatch = useAppDispatch()
  const {isLoading} = useAppSelector((state) => state.todo);

  const toggleCompletedHandler = () => {
    console.log("update")
    dispatch(updateTodo({id: id, isCompleted: !isCompleted}));
  }
  return (
    <li className="p-3 border-2 rounded-2xl shadow flex justify-between items-center">
      <div>
        <h2 className="text-xl">{todo} {isCompleted.toString()}</h2>
        <span className="text-sm text-gray-400">{formatDate(createdAt)}</span>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Switch id="toggle-completed" disabled={isLoading} onClick={toggleCompletedHandler} checked={isCompleted}/>
          <Label htmlFor="toggle-completed" className="text-lg">Completed</Label>
        </div>
        <Button variant="destructive" className="text-lg" disabled={isLoading}>
          Delete
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
