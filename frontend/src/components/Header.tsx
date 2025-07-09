import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const { isDark } = useTheme();

  return (
    <header className={`relative z-50 backdrop-blur-md border-b transition-all duration-300 ${
      isDark 
        ? 'bg-black/20 border-cyan-500/20' 
        : 'bg-white/20 border-purple-500/20'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/Dione.png" 
              alt="DIONE Team" 
              className={`w-10 h-10 rounded-full ring-2 transition-all duration-300 ${
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
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/#features" className={`transition-colors duration-300 ${
              isDark 
                ? 'text-gray-300 hover:text-cyan-400' 
                : 'text-gray-700 hover:text-purple-600'
            }`}>Features</Link>
            <Link to="/trends" className={`transition-colors duration-300 ${
              isDark 
                ? 'text-gray-300 hover:text-cyan-400' 
                : 'text-gray-700 hover:text-purple-600'
            }`}>Trend Detection</Link>
            <Link to="/#services" className={`transition-colors duration-300 ${
              isDark 
                ? 'text-gray-300 hover:text-cyan-400' 
                : 'text-gray-700 hover:text-purple-600'
            }`}>Services</Link>
            <Link to="/#about" className={`transition-colors duration-300 ${
              isDark 
                ? 'text-gray-300 hover:text-cyan-400' 
                : 'text-gray-700 hover:text-purple-600'
            }`}>About</Link>
            <ThemeToggle />
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className={`px-6 py-2 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-cyan-500/25' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/25'
            }`}>
              Get Started
            </button>
          </nav>
          
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button 
              className={`transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 border-t transition-colors duration-300 ${
            isDark ? 'border-cyan-500/20' : 'border-purple-500/20'
          }`}>
            <nav className="flex flex-col space-y-4 mt-4">
              <Link to="/#features" className={`transition-colors duration-300 ${
                isDark 
                  ? 'text-gray-300 hover:text-cyan-400' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}>Features</Link>
              <Link to="/trends" className={`transition-colors duration-300 ${
                isDark 
                  ? 'text-gray-300 hover:text-cyan-400' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}>Trend Detection</Link>
              <Link to="/#services" className={`transition-colors duration-300 ${
                isDark 
                  ? 'text-gray-300 hover:text-cyan-400' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}>Services</Link>
              <Link to="/#about" className={`transition-colors duration-300 ${
                isDark 
                  ? 'text-gray-300 hover:text-cyan-400' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}>About</Link>
              <button className={`px-6 py-2 rounded-full text-white font-semibold w-fit ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500' 
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
                onClick={() => setIsAuthModalOpen(true)}
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Header;