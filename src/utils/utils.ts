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
