import React, { useState } from "react";
import {
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import Signin from "./Signin";
import Signup from "./Signup";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState("");

  // Verification states
  const [step, setStep] = useState<"form" | "verify">("form");
  const [verificationCode, setVerificationCode] = useState("");
  const [userData, setUserData] = useState<any>(null);

  if (!isOpen) return null;

  const handleSuccess = (data: any) => {
    if (isSignUp) {
      // For signup, go to verification step
      setUserData(data.userData);
      setStep("verify");
    } else {
      // For signin, show success immediately
      setIsSuccess(true);
    }
  };

  const handleError = (error: string) => {
    setGeneralError(error);
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setGeneralError("");
    
    try {
      const response = await fetch("http://localhost:8000/accounts/verify/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData?.name,
          code: verificationCode,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setGeneralError(data.error || "Verification failed");
      } else {
        setIsSuccess(true);
        setStep("form");
        setVerificationCode("");
        setUserData(null);
      }
    } catch (err) {
      setGeneralError("Network error during verification");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setGeneralError("");
    setIsSuccess(false);
    setStep("form");
    setVerificationCode("");
    setUserData(null);
  };

  const handleClose = () => {
    setGeneralError("");
    setIsSuccess(false);
    setIsSignUp(false);
    setStep("form");
    setVerificationCode("");
    setUserData(null);
    onClose();
  };

  // Verification step
  if (step === "verify") {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
        <div
          className={`backdrop-blur-sm border rounded-2xl p-8 w-full max-w-md text-center ${
            isDark
              ? "bg-black/40 border-cyan-500/20"
              : "bg-white/40 border-purple-500/20"
          }`}
        >
          <h2
            className={`text-2xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Verify your Email
          </h2>
          <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            A verification code was sent to your email. Please enter it below.
          </p>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            className={`w-full px-4 py-3 rounded-lg border mb-4 focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-black/20 border-cyan-500/50 text-white placeholder-gray-400 focus:ring-cyan-400"
                : "bg-white/50 border-purple-500/50 text-gray-800 placeholder-gray-600 focus:ring-purple-400"
            }`}
          />

          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify Account"}
          </button>
          {generalError && (
            <p className="mt-4 text-red-500 text-sm">{generalError}</p>
          )}
        </div>
      </div>
    );
  }

  // Success step
  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
        <div
          className={`backdrop-blur-sm border rounded-2xl p-8 w-full max-w-md text-center transition-all duration-300 ${
            isDark
              ? "bg-black/40 border-green-500/20"
              : "bg-white/40 border-green-500/20"
          }`}
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2
            className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            {isSignUp ? "Welcome to Trendwave!" : "Welcome Back!"}
          </h2>
          <p
            className={`mb-6 transition-colors duration-300 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {isSignUp
              ? "Your account has been created successfully. You can now start using our AI-powered social media automation platform."
              : "You have successfully logged in. Ready to automate your social media?"}
          </p>
          <button
            onClick={handleClose}
            className={`w-full py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
              isDark
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-cyan-500/25"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25"
            }`}
          >
            Welcome
          </button>
        </div>
      </div>
    );
  }

  // Main auth form
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div
        className={`backdrop-blur-sm border rounded-2xl p-8 w-full max-w-md transition-all duration-300 relative ${
          isDark
            ? "bg-black/40 border-cyan-500/20"
            : "bg-white/40 border-purple-500/20"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-300 ${
            isDark
              ? "text-gray-400 hover:text-white hover:bg-white/10"
              : "text-gray-600 hover:text-gray-800 hover:bg-black/10"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img
              src="/Dione.png"
              alt="DIONE Team"
              className={`w-12 h-12 rounded-full ring-2 transition-all duration-300 ${
                isDark ? "ring-cyan-400/50" : "ring-purple-500/50"
              }`}
            />
            <div>
              <h1
                className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
                  isDark
                    ? "from-cyan-400 to-purple-400"
                    : "from-purple-600 to-pink-600"
                }`}
              >
                Trendwave
              </h1>
              <p
                className={`text-xs transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                by TakTik Team
              </p>
            </div>
          </div>
          <h2
            className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            {isSignUp ? "Join Trendwave" : "Welcome Back"}
          </h2>
          <p
            className={`transition-colors duration-300 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {isSignUp
              ? "Start automating your social media with AI"
              : "Sign in to your account"}
          </p>
        </div>

        {/* General Error */}
        {generalError && (
          <div
            className={`mb-6 p-4 rounded-lg border flex items-center space-x-3 ${
              isDark
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-red-50 border-red-200 text-red-600"
            }`}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{generalError}</span>
          </div>
        )}

        {/* Form Components */}
        {isSignUp ? (
          <Signup
            onSuccess={handleSuccess}
            onError={handleError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <Signin
            onSuccess={handleSuccess}
            onError={handleError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}

        {/* Toggle Mode */}
        <p
          className={`mt-6 text-center text-sm transition-colors duration-300 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleMode}
            className={`font-semibold hover:underline focus:outline-none ${
              isDark
                ? "text-cyan-400 hover:text-cyan-600"
                : "text-purple-600 hover:text-purple-800"
            }`}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;