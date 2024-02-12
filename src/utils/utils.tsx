import { Loader2 } from "lucide-react";
import { Bounce, toast } from "react-toastify";
/**
 * Creates an error toast notification.
 * @param message - The message to display in the toast.
 * @param timeToClose - The time in milliseconds before the toast automatically closes. Default is 5000ms.
 */
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

/**
 * Creates a success toast notification.
 * @param message - The message to display in the toast.
 * @param timeToClose - The time in milliseconds before the toast automatically closes. Default is 5000ms.
 */
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

/**
 * Renders a button based on the state and message provided.
 * If the state is true, it renders a loading spinner with a "Please wait" message.
 * If the state is false, it renders the provided message.
 * @param state - The state of the button.
 * @param message - The message to be displayed on the button.
 * @returns The rendered button element.
 */
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