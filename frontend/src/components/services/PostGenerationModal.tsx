import React, { useState } from 'react';

import { X, Twitter, Loader2 } from 'lucide-react';

import { useTheme } from '../../contexts/ThemeContext';

const BACK_SERVER_IP = import.meta.env.VITE_BACK_SERVER_IP;

interface PostGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PostGenerationModal: React.FC<PostGenerationModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;


  const handleTwitterAuth = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${BACK_SERVER_IP}/post/twitter/start`);
      const data = await response.json();


      if (response.ok && data.auth_url) {
        // Redirect user to Twitter OAuth page
        window.location.href = data.auth_url;
      } else {
        setError('Failed to get Twitter authorization URL.');
        console.error('Backend error:', data);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">

      <div className={`backdrop-blur-sm border rounded-2xl p-8 w-full max-w-2xl transition-all duration-300 relative ${
        isDark 
          ? 'bg-black/40 border-cyan-500/20' 
          : 'bg-white/40 border-purple-500/20'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-300 ${
            isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-800 hover:bg-black/10'
          }`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${
                isDark ? 'from-cyan-500 to-blue-500' : 'from-purple-500 to-pink-500'
              } flex items-center justify-center`}
            >
              <Twitter className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Twitter Authentication
              </h2>
              <p className={`transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Login with Twitter to authorize posting
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className={`mb-4 text-center text-sm font-semibold text-red-500`}>
            {error}
          </p>

        )}

        {/* Auth Button */}
        <button
          onClick={handleTwitterAuth}
          disabled={isLoading}
          className={`w-full py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center ${
            isDark ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-cyan-500/25' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Redirecting...
            </>
          ) : (
            <>
              <Twitter className="w-5 h-5 mr-2" />
              Login with Twitter
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PostGenerationModal;
