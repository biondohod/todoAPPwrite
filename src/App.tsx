import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import SignUpForm from "./_auth/forms/SignUpForm";
import SignInForm from "./_auth/forms/SignInForm";
import { Dashboard, Home } from "./_root/pages";
import RootLayout from "./_root/RootLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useAppDispatch } from "./lib/redux/store";
import { isLoggedIn } from "./lib/appwrite/api";
import { setAuthorized } from "./lib/redux/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  const checkIsLoggedIn = async () => {
    if (await isLoggedIn()) {
      dispatch(setAuthorized(true));
    } else {
      dispatch(setAuthorized(false));
    }
  }

  return (
    <>
      <ToastContainer />
      <main className="flex h-screen">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/sign-up" element={<SignUpForm />} />
              <Route path="/sign-in" element={<SignInForm />} />
            </Route>
            {/* Private Routes */}
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
