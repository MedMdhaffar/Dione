import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import AnimatedBackground from "./components/AnimatedBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Services from "./components/Services";
import Footer from "./components/Footer";
import TrendsDashboard from "./pages/TrendsDashboard";
import CoinContextProvider from "./contexts/CoinContext";

const AppContent: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div
              className={`min-h-screen overflow-x-hidden transition-all duration-300 ${
                isDark
                  ? "bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white"
                  : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800"
              }`}
            >
              <AnimatedBackground />
              <Header />
              <Hero />
              <Features />
              <Services />
              <Footer />
            </div>
          }
        />
        <Route path="/trends" element={<TrendsDashboard />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider> {/* ✅ must come first */}
      <CoinContextProvider>
        <AppContent />
      </CoinContextProvider>
    </ThemeProvider>
  );
}

export default App;
