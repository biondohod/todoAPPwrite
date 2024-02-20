import { useEffect, FC } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { verifyEmail } from "@/lib/redux/auth/authSlice";
import { createErrorToast } from "@/utils/utils";

import Loader from "@/components/Loader/Loader";

/**
 * Component for displaying the verification status of an email.
 */
const Verified: FC = () => {
  const [params] = useSearchParams();
  const secret: string | null = params.get("secret");
  const userId: string | null = params.get("userId");
  const dispatch = useAppDispatch();
  const { isLoading, isEmailVerified } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (secret && userId) {
      dispatch(verifyEmail({ secret, userId }));
    } else {
      navigate("/verifying");
      createErrorToast("Invalid user data. Please try again.");
    }
  }, []);

  useEffect(() => {
    if (isEmailVerified) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isEmailVerified, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="mb-4 text-center text-gray-700 text-5xl max-w-[1280px]">
        {isLoading ? (
          <Loader message="Hang tight! We're verifying your email..." />
        ) : (
          "Success! Your email has been verified. You'll be whisked away to the dashboard shortly."
        )}
      </p>
    </div>
  );
};

export default Verified;