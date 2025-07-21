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
import TwitterCallback from "./pages/TwitterCallBack";
import SuccessPage from "./pages/TwitterSuccess";
import CoinContextProvider from "./contexts/CoinContext";
import NftContextProvider from "./contexts/NftContext";

const HomeLayout: React.FC = () => {
  const { isDark } = useTheme();

  return (
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
  );
};


function App() {
  return (
    <ThemeProvider>
      <CoinContextProvider>
        <NftContextProvider> 
          <Router>
            <Routes>
              <Route path="/" element={<HomeLayout />} />
              <Route path="/trends" element={<TrendsDashboard />} />
              <Route path="/twitter/callback" element={<TwitterCallback />} />
              <Route path="/success" element={<SuccessPage />} />
            </Routes>
          </Router>
        </CoinContextProvider>
    </ThemeProvider>
  );
}

  

export default App;
