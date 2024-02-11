import { Loader2 } from "lucide-react";
import { Bounce, toast } from "react-toastify";

export const createErrorToast = (message: string, timeToClose: number = 5000) => {
  toast.error(message, {
    position: "bottom-left",
    autoClose: timeToClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const createSuccessToast = (message: string, timeToClose: number = 5000) => {
  toast.success(message, {
    position: "bottom-left",
    autoClose: timeToClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const renderButton = (state: boolean, message: string) => {
  if (state) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
      </div>
    );
  }
  return message;
};