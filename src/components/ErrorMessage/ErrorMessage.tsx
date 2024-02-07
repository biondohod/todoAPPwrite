import { ErrorMessageProps } from "@/types";
import { FC } from "react";

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="fixed h-16 bg-[red] text-[white] text-2xl flex items-center justify-center top-0 inset-x-0 text-center p-10">
     {message}
    </div>
  );
};

export default ErrorMessage;
