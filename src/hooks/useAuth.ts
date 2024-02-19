import { isLoggedIn } from "@/lib/appwrite/api";
import { account } from "@/lib/appwrite/config";
import {
  setAuthorized,
  setEmail,
  setEmailVerified,
} from "@/lib/redux/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/store";
import { useEffect } from "react";

/**
 * Custom hook for handling authentication.
 */
const useAuth = () => {
  const dispatch = useAppDispatch();

  const checkIsLoggedIn = async () => {
    if (await isLoggedIn()) {
      dispatch(setAuthorized(true));
      const email = localStorage.getItem("email");
      if (email) {
        dispatch(setEmail(email));
      } else {
        dispatch(setEmail((await account.get()).email));
      }
      const emailVerification = (await account.get()).emailVerification;
      console.log(await account.get())
      dispatch(setEmailVerified(emailVerification));
    } else {
      dispatch(setAuthorized(false));
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
    return () => {};
  }, []);
};

export default useAuth;
