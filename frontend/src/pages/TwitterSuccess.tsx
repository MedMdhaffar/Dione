// src/pages/TwitterSuccess.tsx

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TwitterSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const status = location.state?.status as "success" | "error" | undefined;
  const message = location.state?.message as string | undefined;

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  if (!status || !message) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Invalid Access</h1>
        <p className="text-red-600">No result found. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Twitter OAuth Result</h1>
      <p className={status === "success" ? "text-green-600" : "text-red-600"}>
        {message}
      </p>
    </div>
  );
};

export default TwitterSuccess;
