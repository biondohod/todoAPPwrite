import { Button } from "@/components/ui/button";
import { createEmailVerification } from "@/lib/appwrite/api";
import { useAppSelector } from "@/lib/redux/store";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Verifying = () => {
  const { email, isEmailVerified } = useAppSelector((state) => state.auth);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!timeLeft) {
      setButtonDisabled(false);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  if (isEmailVerified) {
    return <Navigate to="/" />;
  }

  const onVerifyingHandler = () => {
    setButtonDisabled(true);
    createEmailVerification();
    setTimeLeft(60);
  };

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