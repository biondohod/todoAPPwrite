import { Button } from "@/components/ui/button";
import { logOut } from "@/lib/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Root layout component that handles the rendering of the application's content based on the user's authorization status.
 */
const RootLayout = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);
  const dispatch = useAppDispatch();

  /**
   * Handles the logout action by dispatching the logOut action.
   */
  const logOutHandler = async () => {
    dispatch(logOut());
  };

  return (
    <>
      {isAuthorized === false ? (
        <Navigate to="/sign-in" />
      ) : (
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
      )}
    </>
  );
};

export default RootLayout;
