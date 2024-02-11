import { isLoggedIn } from "@/lib/appwrite/api";
import { account } from "@/lib/appwrite/config";
import { setAuthorized } from "@/lib/redux/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/store";
import { useEffect } from "react";

const useAuth = () => {
  const dispatch = useAppDispatch();

  const checkIsLoggedIn = async () => {
    if (await isLoggedIn()) {
      dispatch(setAuthorized(true));
      console.log(await account.get());
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