import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedBackground: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div className={`grid-background ${isDark ? 'grid-dark' : 'grid-light'}`}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`particle ${isDark ? 'particle-dark' : 'particle-light'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Glowing orbs */}
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow ${
        isDark ? 'bg-cyan-500/10' : 'bg-blue-500/20'
      }`}></div>
      <div 
        className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse-slow ${
          isDark ? 'bg-purple-500/10' : 'bg-purple-500/20'
        }`} 
        style={{ animationDelay: '2s' }}
      ></div>
      <div 
        className={`absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl animate-pulse-slow ${
          isDark ? 'bg-pink-500/10' : 'bg-pink-500/20'
        }`} 
        style={{ animationDelay: '4s' }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;