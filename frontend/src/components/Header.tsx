import React from "react";
import { Menu, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import AuthModal from "./AuthModal";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const { isDark } = useTheme();

  return (
    <header
      className={`relative z-50 backdrop-blur-md border-b transition-all duration-300 ${
        isDark
          ? "bg-black/20 border-cyan-500/20"
          : "bg-white/20 border-purple-500/20"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/Dione.png"
              alt="DIONE Team"
              className={`w-10 h-10 rounded-full ring-2 transition-all duration-300 ${
                isDark ? "ring-cyan-400/50" : "ring-purple-500/50"
              }`}
            />
            <div>
              <h1
                className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
                  isDark
                    ? "from-cyan-400 to-purple-400"
                    : "from-purple-600 to-pink-600"
                }`}
              >
                TrendWave
              </h1>
              <p
                className={`text-xs transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                by TakTik Team
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className={`transition-colors duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-cyan-400"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Features
            </a>
            <a
              href="#services"
              className={`transition-colors duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-cyan-400"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Services
            </a>
            <a
              href="#about"
              className={`transition-colors duration-300 ${
                isDark
                  ? "text-gray-300 hover:text-cyan-400"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              About
            </a>
            <ThemeToggle />
          </nav>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              className={`transition-colors duration-300 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className={`md:hidden mt-4 pb-4 border-t transition-colors duration-300 ${
              isDark ? "border-cyan-500/20" : "border-purple-500/20"
            }`}
          >
            <nav className="flex flex-col space-y-4 mt-4">
              <a
                href="#features"
                className={`transition-colors duration-300 ${
                  isDark
                    ? "text-gray-300 hover:text-cyan-400"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                Features
              </a>
              <a
                href="#services"
                className={`transition-colors duration-300 ${
                  isDark
                    ? "text-gray-300 hover:text-cyan-400"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                Services
              </a>
              <a
                href="#about"
                className={`transition-colors duration-300 ${
                  isDark
                    ? "text-gray-300 hover:text-cyan-400"
                    : "text-gray-700 hover:text-purple-600"
                }`}
              >
                About
              </a>
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
