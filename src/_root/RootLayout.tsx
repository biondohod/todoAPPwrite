import { Button } from "@/components/ui/button";
import { logOut } from "@/lib/redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Navigate, Outlet } from "react-router-dom";

const RootLayout = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);
  const dispatch = useAppDispatch();

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
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default RootLayout;
