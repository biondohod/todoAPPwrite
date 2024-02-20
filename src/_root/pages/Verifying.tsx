import { FC, useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/lib/redux/store";
import { createEmailVerification } from "@/lib/appwrite/api";

import { Button } from "@/components/ui/button";

/**
 * Verifying component for email verification.
 * 
 * Renders a message and a button to send a verification email.
 * Displays a countdown timer for sending a new verification link.
 */
const Verifying: FC = () => {
  const { email, isEmailVerified } = useAppSelector((state) => state.auth);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setButtonDisabled(false);
    }
  }, [timeLeft]);

  const onVerifyingHandler = () => {
    setButtonDisabled(true);
    createEmailVerification();
    setTimeLeft(60);
  };

  if (isEmailVerified) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="mb-4 text-center text-gray-700 text-2xl max-w-[1280px]">
        {`For using this todo application your email (${email}) needs to be verified. Please click on the button below and follow the instructions in your email message.`}
      </p>
      <Button className="text-lg" onClick={onVerifyingHandler} disabled={isButtonDisabled}>
        Send Verification Email
      </Button>
      {isButtonDisabled && <p>You can send a new link in {timeLeft} seconds</p>}
    </div>
  );
};

export default Verifying;