import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDark 
          ? 'bg-gradient-to-r from-purple-600 to-cyan-600 focus:ring-cyan-500' 
          : 'bg-gradient-to-r from-orange-400 to-pink-500 focus:ring-orange-500'
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 flex items-center justify-center ${
          isDark ? 'translate-x-0' : 'translate-x-6'
        }`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-purple-600" />
        ) : (
          <Sun className="w-4 h-4 text-orange-500" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;