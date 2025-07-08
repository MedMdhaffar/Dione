import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import Footer from './components/Footer';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

const AppContent: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-all duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800'
      }`}
    >
      <AnimatedBackground />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <Services />
              <Footer />
            </>
          }
        />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;