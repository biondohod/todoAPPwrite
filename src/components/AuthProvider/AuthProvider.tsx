import { AuthProviderProps } from "@/types"
import { FC } from "react"
import Loader from "../Loader/Loader";

const AuthProvider: FC<AuthProviderProps> = ({isAuth, children}) => {
  if (isAuth) {
    return children;
  }
  console.log(isAuth)
  return <Loader/>
}

export default AuthProvider