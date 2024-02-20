import { FC } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { logOut } from "@/lib/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";

import { Button } from "@/components/ui/button";


/**
 * Root layout component that renders the main layout of the application.
 * If the user is not authorized, it redirects to the sign-in page.
 * Otherwise, it displays the log out button and the content of the current route.
 */
const RootLayout: FC = () => {
  const { isAuthorized } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const logOutHandler = async () => {
    dispatch(logOut());
  };

  if (!isAuthorized) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <>
      <Button
        onClick={logOutHandler}
        variant="destructive"
        className="text-lg absolute top-2 right-2"
      >
        Log Out
      </Button>
      <section className="flex flex-1 flex-col py-10">
        <Outlet />
      </section>
    </>
  );
};

export default RootLayout;
