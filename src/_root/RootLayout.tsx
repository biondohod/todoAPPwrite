import { useAppSelector } from "@/lib/redux/store";
import { Navigate, Outlet } from "react-router-dom";

const RootLayout = () => {
  const isAuthorized: boolean = useAppSelector((state) => state.auth.isAuthorized);
  return (
    <>
      {!isAuthorized ? (
        <Navigate to="/sign-in"/>
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
        </>
      )}
    </>
  )
}

export default RootLayout