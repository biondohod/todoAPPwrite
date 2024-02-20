import { FC } from "react";

import Loader from "../Loader/Loader";
import { AuthProviderProps } from "@/types";

/**
 * AuthProvider component provides authentication status to its children.
 * @param {AuthProviderProps} props The props for the Loader component.
 * @param {boolean | null} props.isAuth - The authentication status.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} - The rendered child components or a loader message.
 */
const AuthProvider: FC<AuthProviderProps> = ({ isAuth, children }) => {
  if (isAuth !== null) {
    return children;
  }
  return <Loader message="Please wait checking your authorization status"/>;
};

export default AuthProvider;
