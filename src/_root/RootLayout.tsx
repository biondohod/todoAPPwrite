import { Navigate, Outlet } from "react-router-dom";

const RootLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/sign-up"/>
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