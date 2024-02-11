import { isLoggedIn } from "@/lib/appwrite/api";
import { setAuthorized } from "@/lib/redux/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/store";
import { useEffect } from "react";

const useAuth = () => {
  const dispatch = useAppDispatch();

  const checkIsLoggedIn = async () => {
    if (await isLoggedIn()) {
      dispatch(setAuthorized(true));
    } else {
      dispatch(setAuthorized(false));
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
    return () => {
    };
  }, []);
};

export default useAuth;