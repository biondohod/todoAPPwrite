import { TodoItemProps } from "@/types";
import { formatDate } from "@/utils/utils";
import { FC } from "react";

const TodoItem: FC<TodoItemProps> = ({createdAt, todo}) => {
  
  return (
    <li className="p-3 border-2 rounded-2xl shadow">
      <h2 className="text-xl">{todo}</h2>
      <span className="text-sm text-gray-400">{formatDate(createdAt)}</span>
    </li>
  );
};

export default TodoItem;
