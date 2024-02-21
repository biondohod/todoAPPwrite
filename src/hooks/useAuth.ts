import { useEffect } from "react";

import { isLoggedIn } from "@/lib/appwrite/api";
import { account } from "@/lib/appwrite/config";
import {
  setAuthorized,
  setEmail,
  setEmailVerified,
} from "@/lib/redux/auth/authSlice";
import { useAppDispatch } from "@/lib/redux/store";

/**
 * Custom hook for handling authentication.
 * 
 * Checks if the user is logged in and performs necessary actions based on the result.
 * If the user is logged in, it sets the authorized state, email, and email verification status.
 * If the user is not logged in, it sets the authorized state to false.
 */
const useAuth = () => {
  const dispatch = useAppDispatch();

  const checkIsLoggedIn = async () => {
    try {
      if (await isLoggedIn()) {
        const { email, emailVerification } = await account.get();
        const localStorageEmail: string | null = localStorage.getItem("email");
        dispatch(setAuthorized(true));
        dispatch(setEmail(email || localStorageEmail || ""));
        dispatch(setEmailVerified(emailVerification));
      } else {
        dispatch(setAuthorized(false));
      }
    } catch (error) {
      console.error("Error occurred while checking login status:", error);
    }
  };

  useEffect(() => {
    checkIsLoggedIn();
    return () => {};
  }, []);
};

export default useAuth;
