import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const Signup: React.FC = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number, and special character";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setVerificationError(null);

    try {
      const response = await fetch("http://localhost:8000/accounts/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.username) setErrors({ name: data.username.join(" ") });
        else if (data.email) setErrors({ email: data.email.join(" ") });
        else if (data.password)
          setErrors({ password: data.password.join(" ") });
        else setErrors({ general: JSON.stringify(data) });
        return;
      }

      // Show verification UI
      setIsSuccess(true);
      setIsVerifying(true);
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!verificationCode.trim()) {
      setVerificationError("Verification code is required");
      return;
    }
    setIsLoading(true);
    setVerificationError(null);
    try {
      const response = await fetch("http://localhost:8000/accounts/verify/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name.trim(),
          code: verificationCode.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setVerificationError(data.error || "Verification failed");
        return;
      }
      setIsVerifying(false);
      setVerificationError(null);
      alert("Email verified successfully! You can now log in.");
      // Optionally redirect to login here
    } catch {
      setVerificationError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess && isVerifying) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-6 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`bg-white dark:bg-black p-8 rounded-lg max-w-md w-full text-center`}
        >
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h2
            className={`text-xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Verify Your Email
          </h2>
          <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            A verification code was sent to your email. Please enter it below.
          </p>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className={`w-full p-3 rounded border mb-3 focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-black text-white border-gray-700 focus:ring-cyan-500"
                : "bg-white text-black border-gray-300 focus:ring-purple-500"
            }`}
          />
          {verificationError && (
            <p className="text-red-600 mb-3">{verificationError}</p>
          )}
          <button
            onClick={handleVerifyEmail}
            disabled={isLoading}
            className={`w-full py-3 rounded-full text-white font-semibold transition ${
              isDark
                ? "bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50"
                : "bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
            }`}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </div>
      </div>
    );
  }

  // Original signup form below (unchanged UI except form submit updated)

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-black to-purple-900"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >
      <div
        className={`backdrop-blur-sm border rounded-2xl p-8 w-full max-w-md transition-all duration-300 ${
          isDark
            ? "bg-black/40 border-cyan-500/20"
            : "bg-white/40 border-purple-500/20"
        }`}
      >
        {/* ...rest of your form JSX remains unchanged... */}
        {/* For brevity, keep your existing form JSX and handlers */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Full Name
            </label>
            <div className="relative">
              <User
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.name
                    ? isDark
                      ? "border-red-500/50 bg-black/20 text-white focus:ring-red-500/20"
                      : "border-red-300 bg-white/50 text-gray-800 focus:ring-red-200"
                    : isDark
                    ? "border-gray-600 bg-black/20 text-white focus:ring-cyan-500/20 focus:border-cyan-500/50"
                    : "border-gray-300 bg-white/50 text-gray-800 focus:ring-purple-200 focus:border-purple-400"
                }`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && (
              <p
                className={`mt-1 text-sm transition-colors duration-300 ${
                  isDark ? "text-red-400" : "text-red-600"
                }`}
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? isDark
                      ? "border-red-500/50 bg-black/20 text-white focus:ring-red-500/20"
                      : "border-red-300 bg-white/50 text-gray-800 focus:ring-red-200"
                    : isDark
                    ? "border-gray-600 bg-black/20 text-white focus:ring-cyan-500/20 focus:border-cyan-500/50"
                    : "border-gray-300 bg-white/50 text-gray-800 focus:ring-purple-200 focus:border-purple-400"
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p
                className={`mt-1 text-sm transition-colors duration-300 ${
                  isDark ? "text-red-400" : "text-red-600"
                }`}
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? isDark
                      ? "border-red-500/50 bg-black/20 text-white focus:ring-red-500/20"
                      : "border-red-300 bg-white/50 text-gray-800 focus:ring-red-200"
                    : isDark
                    ? "border-gray-600 bg-black/20 text-white focus:ring-cyan-500/20 focus:border-cyan-500/50"
                    : "border-gray-300 bg-white/50 text-gray-800 focus:ring-purple-200 focus:border-purple-400"
                }`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  isDark
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                className={`mt-1 text-sm transition-colors duration-300 ${
                  isDark ? "text-red-400" : "text-red-600"
                }`}
              >
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? isDark
                      ? "border-red-500/50 bg-black/20 text-white focus:ring-red-500/20"
                      : "border-red-300 bg-white/50 text-gray-800 focus:ring-red-200"
                    : isDark
                    ? "border-gray-600 bg-black/20 text-white focus:ring-cyan-500/20 focus:border-cyan-500/50"
                    : "border-gray-300 bg-white/50 text-gray-800 focus:ring-purple-200 focus:border-purple-400"
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  isDark
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p
                className={`mt-1 text-sm transition-colors duration-300 ${
                  isDark ? "text-red-400" : "text-red-600"
                }`}
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center ${
              isDark
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-cyan-500/25"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p
            className={`text-sm transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <button
              className={`font-semibold transition-colors duration-300 ${
                isDark
                  ? "text-cyan-400 hover:text-cyan-300"
                  : "text-purple-600 hover:text-purple-700"
              }`}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
