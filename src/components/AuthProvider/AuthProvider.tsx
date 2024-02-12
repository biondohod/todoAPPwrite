import { AuthProviderProps } from "@/types"
import { FC } from "react"
import Loader from "../Loader/Loader";

/**
 * AuthProvider component.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isAuth - The authentication status.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} - The rendered component.
 */
const AuthProvider: FC<AuthProviderProps> = ({isAuth, children}) => {
  if (isAuth !== null) {
    return children;
  }
  return <Loader/>
}

export default AuthProvider