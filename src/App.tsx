import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import SignUpForm from "./_auth/forms/SignUpForm";
import SignInForm from "./_auth/forms/SignInForm";
import { Dashboard, Home } from "./_root/pages";
import RootLayout from "./_root/RootLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "./lib/redux/store";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import useAuth from "./hooks/useAuth";

/**
 * The main component of the application.
 * Renders the entire application layout and routes.
 */
function App() {
  const { isAuthorized } = useAppSelector((state) => state.auth);
  useAuth();

  return (
    <>
      <ToastContainer />
      <main className="flex h-screen">
        <AuthProvider isAuth={isAuthorized}>
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
        </AuthProvider>
      </main>
    </>
  );
}

export default App;
