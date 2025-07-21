import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
const BACK_SERVER_IP = import.meta.env.VITE_BACK_SERVER_IP;
interface SigninProps {
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

interface FormData {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

const Signin: React.FC<SigninProps> = ({ onSuccess, onError, isLoading, setIsLoading }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${BACK_SERVER_IP}/accounts/signin/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email?.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const backendErrors: ValidationErrors = {};
          data.errors.forEach((error: any) => {
            if (error.path) {
              backendErrors[error.path as keyof ValidationErrors] = error.msg;
            }
          });
          setErrors(backendErrors);
        } else {
          onError(data.detail || data.error || "Sign in failed");
        }
        return;
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      onSuccess(data);
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Error:", error);
      onError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
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

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
          isDark
            ? "bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-cyan-500/25"
            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25"
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 mx-auto animate-spin" />
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default Signin;