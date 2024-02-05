import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./_root/pages/Home";
import AuthLayout from "./_auth/AuthLayout";
import SignUpForm from "./_auth/forms/SignUpForm";
import SignInForm from "./_auth/forms/SignInForm";
import { Dashboard } from "./_root/pages";

function App() {
  return (
    <main className="flex h-screen">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout/>}>
            <Route path="/sign-up" element={<SignUpForm/>} />
            <Route path="/sign-in" element={<SignInForm/>} />
          </Route>
          {/* Private Routes */}
          <Route element={<AuthLayout/>}>
            <Route index element={<Home/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
