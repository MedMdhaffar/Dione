import React, { useState } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Sign up specific validations
    if (isSignUp) {
      // Name validation
      if (!formData.name?.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }

      // Password strength validation for sign up
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
      if (formData.password && !passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
      }

      // Confirm password validation
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
      const payload = isSignUp 
        ? { name: formData.name?.trim(), email: formData.email.toLowerCase().trim(), password: formData.password }
        : { email: formData.email.toLowerCase().trim(), password: formData.password };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
          setErrors({ general: data.error || `${isSignUp ? 'Registration' : 'Login'} failed` });
        }
        return;
      }

      // Success
      setIsSuccess(true);
      
      // Store token if needed
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Reset form
      setFormData({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
      });

      console.log(`${isSignUp ? 'Registration' : 'Login'} successful:`, data);
      
    } catch (error) {
      console.error(`${isSignUp ? 'Registration' : 'Login'} error:`, error);
      setErrors({ 
        general: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsSuccess(false);
  };

  const handleClose = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsSuccess(false);
    setIsSignUp(false);
    onClose();
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
        <div className={`backdrop-blur-sm border rounded-2xl p-8 w-full max-w-md text-center transition-all duration-300 ${
          isDark 
            ? 'bg-black/40 border-green-500/20' 
            : 'bg-white/40 border-green-500/20'
        }`}>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {isSignUp ? 'Welcome to Trendwave!' : 'Welcome Back!'}
          </h2>
          <p className={`mb-6 transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {isSignUp 
              ? 'Your account has been created successfully. You can now start using our AI-powered social media automation platform.'
              : 'You have successfully logged in. Ready to automate your social media?'
            }
          </p>
          <button
            onClick={handleClose}
            className={`w-full py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-cyan-500/25' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25'
            }`}
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className={`backdrop-blur-sm border rounded-2xl p-8 w-full max-w-md transition-all duration-300 relative ${
        isDark 
          ? 'bg-black/40 border-cyan-500/20' 
          : 'bg-white/40 border-purple-500/20'
      }`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-300 ${
            isDark 
              ? 'text-gray-400 hover:text-white hover:bg-white/10' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-black/10'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <img 
              src="/Dione.png" 
              alt="DIONE Team" 
              className={`w-12 h-12 rounded-full ring-2 transition-all duration-300 ${
                isDark ? 'ring-cyan-400/50' : 'ring-purple-500/50'
              }`}
            />
            <div>
              <h1 className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
                isDark 
                  ? 'from-cyan-400 to-purple-400' 
                  : 'from-purple-600 to-pink-600'
              }`}>
                Trendwave
              </h1>
              <p className={`text-xs transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>by TakTik Team</p>
            </div>
          </div>
          <h2 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            {isSignUp ? 'Join Trendwave' : 'Welcome Back'}
          </h2>
          <p className={`transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {isSignUp 
              ? 'Start automating your social media with AI' 
              : 'Sign in to your account'
            }
          </p>
        </div>

        {errors.general && (
          <div className={`mb-6 p-4 rounded-lg border flex items-center space-x-3 ${
            isDark 
              ? 'bg-red-500/10 border-red-500/20 text-red-400' 
              : 'bg-red-50 border-red-200 text-red-600'
          }`}>
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field - Only for Sign Up */}
          {isSignUp && (
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? isDark
                        ? 'border-red-500/50 bg-black/20 text-white focus:ring-red-500/20'
                        : 'border-red-300 bg-white/50 text-gray-800 focus:ring-red-200'
                      : isDark
                        ? 'border-gray-600 bg-black/20 text-white focus:ring-cyan-500/20 focus:border-cyan-500/50'
                        : 'border-gray-300 bg-white/50 text-gray-800 focus:ring-purple-200 focus:border-purple-400'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className={`mt-1 text-sm transition-colors duration-300 ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  {errors.name}
                </p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? isDark
                      ? 'border-red-500/50 bg-black/20 text-white focus:ring-red-500/20'
                      : 'border-red-300 bg-white/50 text-gray-800 focus:ring-red-200'
                    : isDark
                      ? 'border-gray-600 bg-black/20 text-white focus:ring-cyan-500/20 focus:border-cyan-500/50'
                      : 'border-gray-300 bg-white/50 text-gray-800 focus:ring-purple-200 focus:border-purple-400'
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className={`mt-1 text-sm transition-colors duration-300 ${
                isDark ? 'text-red-400' : 'text-red-600'
              }`}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? isDark
                      ? 'border-red-500/50 bg-black/20 text-white focus:ring-red-500/20'
                      : 'border-red-300 bg-white/50 text-gray-800 focus:ring-red-200'
                    : isDark
                      ? 'border-gray-600 bg-black/20 text-white focus:ring-cyan-500/20 focus:border-cyan-500/50'
                      : 'border-gray-300 bg-white/50 text-gray-800 focus:ring-purple-200 focus:border-purple-400'
                }`}
                placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className={`mt-1 text-sm transition-colors duration-300 ${
                isDark ? 'text-red-400' : 'text-red-600'
              }`}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field - Only for Sign Up */}
          {isSignUp && (
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword || ''}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? isDark
                        ? 'border-red-500/50 bg-black/20 text-white focus:ring-red-500/20'
                        : 'border-red-300 bg-white/50 text-gray-800 focus:ring-red-200'
                      : isDark
                        ? 'border-gray-600 bg-black/20 text-white focus:ring-cyan-500/20 focus:border-cyan-500/50'
                        : 'border-gray-300 bg-white/50 text-gray-800 focus:ring-purple-200 focus:border-purple-400'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className={`mt-1 text-sm transition-colors duration-300 ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-cyan-500/25' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className={`text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={toggleMode}
              className={`font-semibold transition-colors duration-300 ${
                isDark 
                  ? 'text-cyan-400 hover:text-cyan-300' 
                  : 'text-purple-600 hover:text-purple-700'
              }`}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;