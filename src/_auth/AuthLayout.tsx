import { useAppSelector } from "@/lib/redux/store";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  return (
    <>
      {isAuthorized === true ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img src="/assets/images/background.jpg" aria-hidden={true} className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat pointer-events-none"/>
        </>
      )}
    </>
  );
};

export default AuthLayout;
