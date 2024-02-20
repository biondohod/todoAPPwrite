import { FC } from "react";
import { useAppSelector } from "@/lib/redux/store";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Renders the layout for the authentication pages.
 * If the user is logged in, it navigates to the home page.
 * Otherwise, it renders auth forms.
 */
const AuthLayout: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthorized);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet />
      </section>
      <img
        src="/assets/images/background.jpg"
        aria-hidden={true}
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat pointer-events-none"
      />
    </>
  );
};

export default AuthLayout;
